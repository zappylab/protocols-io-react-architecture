/* 
    this json contatins all needed meta for page
    constant - page constant
    original - if original = true it means that we use this page as default
    urls     - what urls we want to assign to page
    react    - name of react file in base react dir (can be complex path e.c. /profile/data)
*/


export pages = {
    HOME : {
        constant    : 'HOME',
        original    : true,
        urls        : [],
        react       : 'welcome'
    },
    
    ABOUT : {
        constant    : 'ABOUT',
        urls        : ['about'],
        react       : 'about'
    },
    
    PROFILE : {
        constant    : 'PROFILE',
        urls        : ['profile'],
        react       : 'user_profile'
    }
}