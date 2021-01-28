import { storage } from './Firebase.utils';

export async function getImage(id, value) {
  return new Promise((resolve, reject)=>{
    
    let folderArray = ['tractorImages/', 'attachedMachinery/']
    let imageArray = [['New Holland 95.jpg', 'TM-165.jpg', 'Fiat 70-86 4x2.jpg', 'Fiat 70-86 4x4.jpg'],
    ['Plow1.jpg', 'Plow2.jpg', 'Plow3.jpg', 'Plow4.jpg']]
 
    if (id === 1 || id === 2) {
    if (value !== 0 && id === 1) 
     storage.refFromURL('gs://input-output-data.appspot.com/' + folderArray[id - 1] + imageArray[0][value - 1])
       .getDownloadURL().then((url) => {
        resolve(url)
       }).catch(err => {
        reject(err)
      })
     else if (value !== 0 && id === 2) 
     storage.refFromURL('gs://input-output-data.appspot.com/' + folderArray[id - 1] + imageArray[1][value - 1])
       .getDownloadURL().then((url) => {
        resolve(url)
      }).catch(err => {
        reject(err)
      }) 
     }
  })
}
