rules_version = '2';
service cloud.firestore {  
  match /databases/{database}/documents {
  	// declare users functions
  	function isAuth() {
  		return request.auth != null;
    }  
    function getUserDoc() {
      return get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data
    }
    function isAdmin() {
    	return getUserDoc().role == 'ADMIN'
    }
    function isProfileOwner(id) {
      return request.auth.uid == id;
    }
    // declare rendezvous functions
    function getRdvDoc(id) {
    	return get(/databases/$(database)/documents/Rendezvous/$(id)).data
    }
    function isRdvOwner(id) {
      return getRdvDoc(id).createdBy == getUserDoc().email
    }
    
  	// rules
    match /{document=**} {
      allow read, write: if false;
    }
    
    match /profiles/{userId} {
      allow create: if true;
      allow read, update, delete: if isAuth() && (isProfileOwner(userId) || isAdmin())
    }
    
    match /Rendezvous/{rdvId} {
    	allow create, read: if isAuth();
      allow update, delete: if isAuth() && (isRdvOwner(rdvId) || isAdmin())
    }
  }
}