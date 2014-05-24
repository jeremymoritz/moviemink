

//here's a sort test for you (taken from my own work here at solidify):  You have an array of objects.  Each object contains these parameters: name, dateOfBirth, and relationship (which will always be one of three values: EMPLOYEE, SPOUSE, or CHILD.  This array of objects will always include exactly one employee, either 0 or 1 spouse, and any number of children (0-infinity).  I want the objects sorted in this order: EMPLOYEE, SPOUSE(which may or may not be present), and CHILDren in birth order (and alphabetical order by name in the case of twins)

objArray.sort(function(a,b){
	var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
 if (nameA < nameB){
  return -1 }
 if (nameA > nameB) {
  return 1 }
});
objArray.sort(function(a,b){
	return a.dateOfBirth - b.dateOfBirth;
})
objArray.sort(function(a,b){ 
 return a.relationship == 'SPOUSE' ? -1 : a.relationship == 'CHILD' ? 1 : 0});
