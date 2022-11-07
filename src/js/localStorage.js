import Notiflix from 'notiflix';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, child, push, update, get  } from "firebase/database";
import { database } from "./firebase";

import { refs } from "./refs/refs";
import { renderMarkUp } from './markups/collectionRender'
import { fetchGenreId } from './collectionFetch'; 

console.log(refs);
const auth = getAuth();
const USER_LOGIN_KEY = 'userIsLogin';


const container = document.querySelector('.container-films')

let genreCollection = {};
fetchGenreId()
  .then(genreId => {
    genreId.data.genres.forEach(function (genre) {
      genreCollection[genre.id] = genre.name;
    });
  })
  .catch(error => console.log(error));


//------------------------add to queue---------------


const onClickBtn = (data,e)=>{

    const idMovie = data.id
  
    if (e.target.name !== 'queue') {
        return;
        
    };
          /*-------перевіряю чи залогінився юзер ------------*/
    const userIsLogin = JSON.parse(localStorage.getItem(USER_LOGIN_KEY));
    
    if (userIsLogin) {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            const dbRef = ref(getDatabase());
            const uid = user.uid; 


            if (user) {
                get(child(dbRef, `users/${uid}`)).then((snapshot) => {

                    if (snapshot.exists()) {
                        const queueDataString = snapshot.val().queueList
                        if (queueDataString === '') {

                            let listWatchedArr = [];
                            listWatchedArr.push(data);

                            const queueListString = JSON.stringify(listWatchedArr);
                            console.log(queueListString);
                            update(ref(database, 'users/' + uid),{
                                queueList: queueListString
                            });  
                        } else{
                            
                            const queueDataArr = JSON.parse(queueDataString);
                            console.log(queueDataArr);
                            
                            /*---- перевіряю  масив на однакові id і добавляю новий об'єкт-------*/
                            const checkArr = queueDataArr.some(obj => obj.id === idMovie);
                            //listWatchedArr.map(obj => obj.id).includes(idMovie) // інший спосіб
                         
                            if (checkArr) {
                                Notiflix.Notify.info(`Тhis movie was add to the QUEUE`,{
                                    timeout: 2000,
                                });
                                
                            }else{

                                // ---------добавляю новий об'єк в масив і перезаписую data-------------
                                queueDataArr.push(data)
                                const queueListString = JSON.stringify(queueDataArr)

                                update(ref(database, 'users/' + uid),{
                                    queueList: queueListString
                                });

                                Notiflix.Notify.success(`Added movie to QUEUE`,{
                                    timeout: 2000,
                                });

                            };

                        };
                  
                    } else {

                        Notiflix.Notify.failure(`No data available`,{
                            timeout: 2000,
                        });
                      console.log("No data available");

                    }
                  }).catch((error) => {
                    console.error(error);
                });

                
            }});
    } else{
        Notiflix.Notify.failure(`please log in`,{
            timeout: 2000,
        });
        return;
    };
};




// ------------------click my library-------------

const onMyLibararyClick = e =>{

    if ( e.target.name !=='library') {
        return; 
    };


//    const moviesListLocalStorage= JSON.parse(localStorage.getItem(WATCHED_KYE));
//    if (moviesListLocalStorage === null) {
//     Notiflix.Notify.failure(`my library is emty`,{
//         timeout: 2000,
//     });
//     return;
//    }
//     // const renderLibrary = fotoCardsTpl(moviesListLocalStorage);
//     const renderLibrary = renderMarkUp(moviesListLocalStorage, genreCollection);
//     container.innerHTML = renderLibrary;


    onAuthStateChanged(auth, (user) => {

        if (user) {
            const uid = user.uid; 
            const dbRef = ref(getDatabase());
      
            get(child(dbRef, `users/${uid}`)).then((snapshot) => {
      
                if (snapshot.exists()) {
                    const queueListData = snapshot.val().queueList
                    if (queueListData === '') {
                        Notiflix.Notify.failure(`Opps🙊 your library is empty!`,{
                            timeout: 2000,
                        });
                    }else{
                        const queueList = JSON.parse(snapshot.val().queueList)
                        console.log(queueList);
                    };
                    
                   
                } else {
                console.log("No data available");
            }
            }).catch((error) => {
                console.error(error);
            });
          // ...
        } else {
          // User is signed out
          // ...
        }
    });
};

refs.headerNavList.addEventListener('click',onMyLibararyClick);



export{ onClickBtn };