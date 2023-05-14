


export const  UnifiedData = (Data) =>{

    Data.reduce((acc, item) => {
        if (!acc[item.name]) {
          acc[item.name] = {name: item.name, bicycle: 0};
        }
        acc[item.name].bicycle += item.bicycle;
        return acc;
      }, {})

}

export const SortUnifedData = (Data) => {
 if (Data !== undefined){
    Object.values(Data).sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return a.bicycle - b.bicycle;
      });
 }
    
} 
  


export const GroupDirectionDetails = (Data) =>{

    const groupedData = {};

    Data.forEach(obj => {
      for (let key in obj) {
        if (groupedData.hasOwnProperty(key)) {
          groupedData[key] += obj[key];
        } else {
          groupedData[key] = obj[key];
        }
      }
    });
     return Object.keys(groupedData).map(key => ({ [key]: groupedData[key] }));


}