
window.onload = () =>{
    let menu = document.querySelector('nav');
    menu.style.right = '-110%';

}
document.getElementById("hamburger-menu").addEventListener("click", function(){
    let menu = document.querySelector('nav');
    this.style.zIndex = 10;

    if(menu.style.right === '0%'){
        this.className ="hamburger hamburger--collapse";
        menu.style.right = '-110%';
        this.style.zIndex = 0;
        this.style.right ="10%";
        this.style.position = 'absolute';
    }
    else{
        this.className ="hamburger hamburger--collapse is-active";
        menu.style.display ="block";
        menu.style.right = '0%';
        this.style.position = 'fixed';
        this.style.right = '15vw';
        this.style.top ='0';
    }
})
