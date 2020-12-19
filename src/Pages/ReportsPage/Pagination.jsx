
class Cursor {
  constructor(baseRef, pageSize) {
     this.baseRef = baseRef;
     this.lastKey = null;
     this.lastValue = null;
     this.pageSize = pageSize;
  }
  
  next() {
    let ref = this.baseRef;
    
    if( this.lastValue !== null ) {
       // a previous page has been loaded so get the next one using the previous value/key
       // we have to start from the current cursor so add one to page size
       ref = ref.startAt(this.lastValue, this.lastKey).limitToFirst(this.pageSize+1);
    }
    else {
       // this is the first page
       ref = ref.limitToFirst(this.pageSize);
    }
    
    return ref.once('value').then(snap => {
      const keys = [];
      const data = []; // store data in array so it's ordered
      
      snap.forEach(ss => {
         data.push(ss.val());
         keys.push(ss.key);
      });
             
      if( this.lastValue !== null ) {
        // skip the first value, which is actually the cursor
        keys.shift();
        data.shift();
      }

      // store the last loaded record
      if( data.length ) {
        const last = data.length - 1;
        this.lastKey = keys[last];
        this.lastValue = data[last].author;
      }

      return data;
    });
  }
}

export default Cursor;

