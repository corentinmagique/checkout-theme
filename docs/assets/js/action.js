import TinyGesture from "https://unpkg.com/tinygesture@1.1.4/TinyGesture.js";

function doubleTap(target)
{
    const openModalButtons = $('.openModal');
    const closeModalButtons = $('.closeModal');
    const modal = $('#modal');
    const modalContainer = $('#modal-container');

    const gesture = new TinyGesture(target);
    gesture.on('doubletap', (event) => {
        modal.addClass('active');
        modalContainer.html(`
            <div class="card itemdetail-menu animate__animated animate__bounceIn">
                <div class="card-body">
                    <div class="header d-flex flex-row justify-content-between">
                        <a href="#" class="closeModal">
                            <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                        </a> 
                    </div>
                </div>
            </div>
        `);
    })
    
}

function moveItem(target)
{
    const gesture = new TinyGesture(target);
    let posx = 0, posy = 0;

    gesture.on('panmove', () => {
        if (gesture.animationFrame) {
        return;
        }
        gesture.animationFrame = window.requestAnimationFrame(() => {
            target.style.zIndex = 1000;
            target.style.transition = '0s'
            const img = target.querySelector('img')
            document.querySelectorAll('.snap-el').forEach((e)=>{
                e.style.transition = '0.25s'
                // e.style.opacity = 1
                const snapElPos = e.getBoundingClientRect()
                const elPos = img.getBoundingClientRect()
                target.style.top = elPos.top
                target.style.left = elPos.left
                if(!(elPos.right < snapElPos.left || 
                    elPos.left > snapElPos.right || 
                    elPos.bottom < snapElPos.top || 
                    elPos.top > snapElPos.bottom))
                {
                    e.style.opacity = 1
                    posx = elPos.x
                    posy = elPos.y
                }else
                {
                    e.style.opacity = 0
                }

            })
            target.style.transform = 'translate3d('+gesture.touchMoveX+'px, '+gesture.touchMoveY+'px, 0)';
            window.requestAnimationFrame(() => {
                target.style.transition = null;
            });
            gesture.animationFrame = null;
        });
    });

    gesture.on('panend', () => {
        window.cancelAnimationFrame(gesture.animationFrame);
        target.style.transition = '0.5s'
        document.querySelectorAll('.snap-el').forEach((e)=>{
            e.style.opacity = 0
        })
        target.style.zIndex = 0;
        target.style.transform = 'translate3d(0px, 0px, 0)';
        gesture.animationFrame = null;
    });
}

function initSlider(target) {
    let swiped = false;
    let startOffset = 0;
    const decelerationOnOverflow = 4;
    const revealWidth = 50;
    const snapWidth = revealWidth / 1.5;
  
    const gesture = new TinyGesture(target);
  
    gesture.on("panmove", (event) => {
      if (gesture.animationFrame) {
        return;
      }
      gesture.animationFrame = window.requestAnimationFrame(() => {
        let getX = (x) => {
          if (x < revealWidth && x > -revealWidth) {
            return x;
          }
          if (x < -revealWidth) {
            return (x + revealWidth) / decelerationOnOverflow - revealWidth;
          }
          if (x > revealWidth) {
            return (x - revealWidth) / decelerationOnOverflow + revealWidth;
          }
        };
        const newX = getX(startOffset + gesture.touchMoveX);
        
        target.style.transform = "translateX(" + newX + "px)";
        // console.log(newX)
        if(newX < -200)
            target.parentNode.remove();
        if(newX > 200)
        {
            const openModalButtons = $('.openModal');
            const closeModalButtons = $('.closeModal');
            const modal = $('#modal');
            const modalContainer = $('#modal-container');

            modal.addClass('active');
            modalContainer.html(`
                <div class="card itemdetail-menu animate__animated animate__bounceIn">
                    <div class="card-body">
                        <div class="header d-flex flex-row justify-content-between">
                            <a href="#" class="closeModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>
                        <div class="d-flex flex-row justify-content-between align-items-center">
                            <div class="picture_add_form">
                                <img src="assets/img/samoussabanane.jpg" height="132px" class="rounded m-2">
                                <input type="file" name="item-pic" id="item-pic">
                            </div>
                            
                            <div class="d-flex flex-column w-100">
                                <div class="d-flex flex-row">
                                    <div class="card bg-card d-flex flex-row align-items-center m-1">
                                        <span class="mdi mdi-shape mdi-32px m-2">
                                        </span>
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Famille</span>
                                            <span class="fs-small">Aucune</span>
                                        </div>
                                    </div>

                                    <div class="card bg-card d-flex flex-row align-items-center m-1">
                                        <span class="mdi mdi-file mdi-32px m-2">
                                        </span>
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Sous-famille</span>
                                            <span class="fs-small">Aucune</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row">

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Prix H.T</span>
                                            <input class="fs-small mt-1" value="0.30€">
                                        </div>
                                    </div>

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Prix T.T.C</span>
                                            <input class="fs-small mt-1" value="0.30€">
                                        </div>
                                    </div>

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">TVA</span>
                                            <input class="fs-small mt-1" value="20%">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-center align-items-center mt-2">
                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2">
                                    <span class="fw-bold fs-small">Désignation</span>
                                    <input class="fs-small mt-1" value="SAMOUSSAS BANANE">
                                </div>
                            </div>

                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2">
                                    <span class="fw-bold fs-small">Code-Barres</span>
                                    <input class="fs-small mt-1" value="F0123456789">
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-end align-items-center mt-2">
                            <button class="success-button">
                                <span class="mdi mdi-content-save text-white"></span>
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            `);
        }
        if (newX >= snapWidth || newX <= -snapWidth) {
          swiped = newX < 0 ? -revealWidth : revealWidth;
        } else {
          swiped = false;
        }
        window.requestAnimationFrame(() => {
          target.style.transition = null;
        });
        gesture.animationFrame = null;
      });
    });
  
    gesture.on("panend", (event) => {

      window.requestAnimationFrame(() => {
        target.style.transition = "transform .2s ease-in";
        swiped = false;
        startOffset = 0;
        target.style.transform = null;
      });
    });
  }

$(document).ready(function()
{
    
    const openModalButtons = $('.openModal');
    const closeModalButtons = $('.closeModal');
    const modal = $('#modal');
    const modalContainer = $('#modal-container');

    // $('.actions-wrapper .card input').on('blur',function () { 
    //     var blurEl = $(this); 
    //     setTimeout(function() {
    //         blurEl.focus()
    //     }, 10);
    // });

    // document.querySelectorAll(".swipe-item").forEach(doubleTap);
    document.querySelectorAll(".swipe-item").forEach(initSlider);

    $(document).on('click', '.openModal', function(event)
    {
        var modalContent = null;
        modal.addClass('active');
        // console.log(event.currentTarget)
        switch(event.currentTarget.id)
        {
            case 'open-mainmenu-button':
                modalContent = `
                    <div class="header position-absolute top-0 end-0 d-flex flex-row justify-end">
                        <a href="#" class="closeModal">
                            <span class="mdi mdi-close text-white m-2" style="font-size: 24px;"></span>
                        </a> 
                    </div>
                    <div class="d-flex flex-row">

                        <div class="d-flex flex-column align-items-center me-4">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#CBEBFF;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/checkout.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Ouvrir tiroir</span>
                        </div>

                        <div class="d-flex flex-column align-items-center me-4">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#FDFDFC;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/box.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Stocks</span>
                        </div>

                        <div class="d-flex flex-column align-items-center me-4">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#2F3D4E;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/ticket.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Rapp. ticket</span>
                        </div>

                        <div class="d-flex flex-column align-items-center me-4">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#73C5B7;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/money.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Entrées/Sorties</span>
                        </div>

                        <div class="d-flex flex-column align-items-center me-4">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#F6634B;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/layout.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Layout</span>
                        </div>

                        <div class="d-flex flex-column align-items-center me-4">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#CBEBFF;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/cog.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Paramètres</span>
                        </div>

                    </div>
                    <div class="d-flex flex-row mt-5">
                        <button id="open-logout-button-frommenu" class="modal-button animate__animated animate__bounceIn openModal">
                            <span class="mdi mdi-logout mdi-18px"></span>
                            <span>Déconnexion</span>
                        </button>
                        <button id="open-cloture-button" class="modal-button animate__animated animate__bounceIn openModal">
                            <span class="mdi mdi-lock-outline mdi-18px"></span>
                            <span>Clotûrer</span>
                        </button>
                    </div>
                    
                `
            break;

            case 'open-cloture-button':
                modalContent = `
                    <div class="card cloture-menu animate__animated animate__bounceIn">
                        <div class="card-body">
                            <div class="header d-flex flex-row justify-content-between align-items-center">
                                <span class="fw-bold text-blue">Déclaration du reçu</span>
                                <a href="#" class="closeModal">
                                    <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                                </a> 
                            </div>
                            <div class="card">
                                <div class="payment-method fs-small">
                                    <ul>
                                        <li class="active">
                                            <a href="#" class="row">
                                                <div class="col-3 d-flex flex-column justify-content-center align-items-center">
                                                    <span class="icon"><img src="assets/img/money.png" height="32px"></span>
                                                </div>  
                                                <div class="col-9">
                                                    <div class="d-flex flex-column m-3">
                                                        <span class="title">Espèce</span>
                                                        <div class="d-flex flex-row justify-content-between">
                                                            <span>Enregistré : </span>
                                                            <span>350,00 €</span>
                                                        </div>
                                                        <div class="d-flex flex-row justify-content-between">
                                                            <span>Reçu : </span>
                                                            <span>0,00 €</span>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#" class="row">
                                                <div class="col-3 d-flex flex-column justify-content-center align-items-center">
                                                    <span class="icon"><img src="assets/img/credit-card.png" height="32px"></span>
                                                </div>  
                                                <div class="col-9">
                                                    <div class="d-flex flex-column m-3">
                                                        <span class="title">Carte</span>
                                                        <div class="d-flex flex-row justify-content-between">
                                                            <span>Enregistré : </span>
                                                            <span>350,00 €</span>
                                                        </div>
                                                        <div class="d-flex flex-row justify-content-between">
                                                            <span>Reçu : </span>
                                                            <span>0,00 €</span>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#" class="row">
                                                <div class="col-3 d-flex flex-column justify-content-center align-items-center">
                                                    <span class="icon"><img src="assets/img/cheque.png" height="32px"></span>
                                                </div>  
                                                <div class="col-9">
                                                    <div class="d-flex flex-column m-3">
                                                        <span class="title">Chèque</span>
                                                        <div class="d-flex flex-row justify-content-between">
                                                            <span>Enregistré : </span>
                                                            <span>350,00 €</span>
                                                        </div>
                                                        <div class="d-flex flex-row justify-content-between">
                                                            <span>Reçu : </span>
                                                            <span>0,00 €</span>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#" class="row">
                                                <div class="col-3 d-flex flex-column justify-content-center align-items-center">
                                                    <span class="icon"><img src="assets/img/ticket.png" height="32px"></span>
                                                </div>  
                                                <div class="col-9">
                                                    <div class="d-flex flex-column m-3">
                                                        <span class="title">Titre</span>
                                                        <div class="d-flex flex-row justify-content-between">
                                                            <span>Enregistré : </span>
                                                            <span>350,00 €</span>
                                                        </div>
                                                        <div class="d-flex flex-row justify-content-between">
                                                            <span>Reçu : </span>
                                                            <span>0,00 €</span>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </a>
                                        </li>
                            
                                    </ul>
                                </div>

                                <div class="recap-details">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                `
            break;
            
            case 'attente-button':
                modalContent = `
                    <div class="header position-absolute top-0 end-0 d-flex flex-row justify-end">
                        <a href="#" class="closeModal">
                            <span class="mdi mdi-close text-white m-2" style="font-size: 24px;"></span>
                        </a> 
                    </div>
                    <div class="row w-100 justify-content-start">
                        <h6 class="text-white fw-bold ms-3">Mes tickets en attente</h6>
                        <div class="col-2 waiting-ticket card m-2 p-2 openModal animate__animated animate__bounceIn" id="confirm-reprise-button">
                            <div class="d-flex flex-row justify-content-between w-100">
                                <span class="header fs-small fw-bold">1-000000154</span>
                                <span class="header fs-small fw-bold text-black">10:17</span>
                            </div>
                            
                            <span class="fs-small">Sans nom</span>
                            <span class="fs-small text-muted text">Normal</span>

                            <div class="d-flex flex-column mt-2 fs-small">
                                <span>3x Gâteau Banane</span>
                                <span>10x Samoussas Banane</span>
                                <span>80x Beignets Banane</span>
                            </div>

                            <div class="d-flex flex-row w-100 justify-content-end">
                                <div class="d-flex flex-column justify-content-start">
                                    <span class="fw-bold fs-small text-muted">CB</span>
                                    <span class="fw-bold fs-small text-black">120,00 €</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row w-100 justify-content-start mt-2">
                        <h6 class="text-white fw-bold ms-3">Tickets en attende de : <span class="fw-light">N789456321</span></h6>

                        <div class="col-2 waiting-ticket card m-2 p-2 openModal animate__animated animate__bounceIn" id="confirm-reprise-button">
                            <div class="d-flex flex-row justify-content-between w-100">
                                <span class="header fs-small fw-bold">1-000000154</span>
                                <span class="header fs-small fw-bold text-black">10:17</span>
                            </div>
                            
                            <span class="fs-small">Sans nom</span>
                            <span class="fs-small text-muted text">Normal</span>

                            <div class="d-flex flex-column mt-2 fs-small">
                                <span>3x Gâteau Banane</span>
                                <span>10x Samoussas Banane</span>
                                <span>80x Beignets Banane</span>
                            </div>

                            <div class="d-flex flex-row w-100 justify-content-end">
                                <div class="d-flex flex-column justify-content-start">
                                    <span class="fw-bold fs-small text-muted">CB</span>
                                    <span class="fw-bold fs-small text-black">120,00 €</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-2 waiting-ticket card m-2 p-2 openModal animate__animated animate__bounceIn" id="confirm-reprise-button">
                            <div class="d-flex flex-row justify-content-between w-100">
                                <span class="header fs-small fw-bold">1-000000154</span>
                                <span class="header fs-small fw-bold text-black">10:17</span>
                            </div>
                            
                            <span class="fs-small">Sans nom</span>
                            <span class="fs-small text-muted text">Normal</span>

                            <div class="d-flex flex-column mt-2 fs-small">
                                <span>3x Gâteau Banane</span>
                                <span>10x Samoussas Banane</span>
                                <span>80x Beignets Banane</span>
                            </div>

                            <div class="d-flex flex-row w-100 justify-content-end">
                                <div class="d-flex flex-column justify-content-start">
                                    <span class="fw-bold fs-small text-muted">CB</span>
                                    <span class="fw-bold fs-small text-black">120,00 €</span>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="row w-100 justify-content-start mt-2">
                        <h6 class="text-white fw-bold ms-3">Tickets en attende de : <span class="fw-light">N123456789</span></h6>

                        <div class="col-2 waiting-ticket card m-2 p-2 openModal animate__animated animate__bounceIn" id="confirm-reprise-button">
                            <div class="d-flex flex-row justify-content-between w-100">
                                <span class="header fs-small fw-bold">1-000000154</span>
                                <span class="header fs-small fw-bold text-black">10:17</span>
                            </div>
                            
                            <span class="fs-small">Sans nom</span>
                            <span class="fs-small text-muted text">Normal</span>

                            <div class="d-flex flex-column mt-2 fs-small">
                                <span>3x Gâteau Banane</span>
                                <span>10x Samoussas Banane</span>
                                <span>80x Beignets Banane</span>
                            </div>

                            <div class="d-flex flex-row w-100 justify-content-end">
                                <div class="d-flex flex-column justify-content-start">
                                    <span class="fw-bold fs-small text-muted">CB</span>
                                    <span class="fw-bold fs-small text-black">120,00 €</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-2 waiting-ticket card m-2 p-2 openModal animate__animated animate__bounceIn" id="confirm-reprise-button">
                            <div class="d-flex flex-row justify-content-between w-100">
                                <span class="header fs-small fw-bold">1-000000154</span>
                                <span class="header fs-small fw-bold text-black">10:17</span>
                            </div>
                            
                            <span class="fs-small">Sans nom</span>
                            <span class="fs-small text-muted text">Normal</span>

                            <div class="d-flex flex-column mt-2 fs-small">
                                <span>3x Gâteau Banane</span>
                                <span>10x Samoussas Banane</span>
                                <span>80x Beignets Banane</span>
                            </div>

                            <div class="d-flex flex-row w-100 justify-content-end">
                                <div class="d-flex flex-column justify-content-start">
                                    <span class="fw-bold fs-small text-muted">CB</span>
                                    <span class="fw-bold fs-small text-black">120,00 €</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-2 waiting-ticket card m-2 p-2 openModal animate__animated animate__bounceIn" id="confirm-reprise-button">
                            <div class="d-flex flex-row justify-content-between w-100">
                                <span class="header fs-small fw-bold">1-000000154</span>
                                <span class="header fs-small fw-bold text-black">10:17</span>
                            </div>
                            
                            <span class="fs-small">Sans nom</span>
                            <span class="fs-small text-muted text">Normal</span>

                            <div class="d-flex flex-column mt-2 fs-small">
                                <span>3x Gâteau Banane</span>
                                <span>10x Samoussas Banane</span>
                                <span>80x Beignets Banane</span>
                            </div>

                            <div class="d-flex flex-row w-100 justify-content-end">
                                <div class="d-flex flex-column justify-content-start">
                                    <span class="fw-bold fs-small text-muted">CB</span>
                                    <span class="fw-bold fs-small text-black">120,00 €</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-2 waiting-ticket card m-2 p-2 openModal animate__animated animate__bounceIn" id="confirm-reprise-button">
                            <div class="d-flex flex-row justify-content-between w-100">
                                <span class="header fs-small fw-bold">1-000000154</span>
                                <span class="header fs-small fw-bold text-black">10:17</span>
                            </div>
                            
                            <span class="fs-small">Sans nom</span>
                            <span class="fs-small text-muted text">Normal</span>

                            <div class="d-flex flex-column mt-2 fs-small">
                                <span>3x Gâteau Banane</span>
                                <span>10x Samoussas Banane</span>
                                <span>80x Beignets Banane</span>
                            </div>

                            <div class="d-flex flex-row w-100 justify-content-end">
                                <div class="d-flex flex-column justify-content-start">
                                    <span class="fw-bold fs-small text-muted">CB</span>
                                    <span class="fw-bold fs-small text-black">120,00 €</span>
                                </div>
                            </div>
                        </div>
                  

                    </div>
                    
                `
            break;
            case 'open-paymentmenu-button':
                modalContent = `<div class="payment-menu animate__animated animate__bounceIn d-flex flex-row">
                <div class="keyboard-part d-flex flex-column">
                    <div class="header d-flex flex-row justify-content-between">
                        <a href="#" class="closeModal">
                            <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                        </a> 
                    </div>

                    <div class="d-flex flex-row justify-content-center mt-2">
                        <span class="fw-bold" style="font-size: 1.5em">0,00</span>
                    </div>

                    <div class="d-flex flex-row justify-content-center mt-2">
                        <a href="#" id="active-discount-button" class="d-flex flex-row align-items-center">
                            <span class="mdi mdi-sale"></span>
                            <span class="text">Remises</span>
                        </a>
                    </div>

                    <div class="d-flex flex-column justify-content-center mt-2">
                        <div class="d-flex flex-row justify-content-center">   
                            <a href="#" class="keyboard-button"><span>1</span></a>
                            <a href="#" class="keyboard-button"><span>2</span></a>
                            <a href="#" class="keyboard-button"><span>3</span></a>
                        </div>
                        <div class="d-flex flex-row justify-content-center">   
                            <a href="#" class="keyboard-button"><span>4</span></a>
                            <a href="#" class="keyboard-button"><span>5</span></a>
                            <a href="#" class="keyboard-button"><span>6</span></a>
                        </div>
                        <div class="d-flex flex-row justify-content-center">   
                            <a href="#" class="keyboard-button"><span>7</span></a>
                            <a href="#" class="keyboard-button"><span>8</span></a>
                            <a href="#" class="keyboard-button"><span>9</span></a>
                        </div>
                        <div class="d-flex flex-row justify-content-center">   
                            <a href="#" class="keyboard-button"><span class="mdi mdi-backspace"></span></a>
                            <a href="#" class="keyboard-button"><span>0</span></a>
                            <a href="#" class="keyboard-button"><span>,</span></a>
                        </div>
                    </div>
                </div>

                <div class="options-part d-flex flex-column">
                    <ul>
                        <li>
                            <a href="#">
                                <span class="icon"><img src="assets/img/money.png" height="32px"></span>
                                <span class="title">Espèce</span>
                            </a>
                        </li>
            
                        <li>
                            <a href="#">
                                <span class="icon"><img src="assets/img/credit-card.png" height="32px"></span>
                                <span class="title">Carte</span>
                            </a>
                        </li>
            
                        <li>
                            <a href="#">
                                <span class="icon"><img src="assets/img/cheque.png" height="32px"></span>
                                <span class="title">Chèque</span>
                            </a>
                        </li>
            
                        <li>
                            <a href="#">
                                <span class="icon"><img src="assets/img/ticket.png" height="32px"></span>
                                <span class="title">Titre</span>
                            </a>
                        </li>
            
                        <li>
                            <a href="#">
                                <span class="icon"><img src="assets/img/team.png" height="32px"></span>
                                <span class="title">Compte</span>
                            </a>
                        </li>
            
                        <li>
                            <a href="#">
                                <span class="icon"><img src="assets/img/giftbox.png" height="32px"></span>
                                <span class="title">Avoir</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>`
            break;
            case 'open-productlibre-button':
                modalContent = `
                <div class="card itemdetail-menu animate__animated animate__bounceIn">
                    <div class="card-body">
                        <div class="header d-flex flex-row justify-content-end">
                            <a href="#" class="closeModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>
                        <div class="d-flex flex-row justify-content-between align-items-center">
                            
                            <div class="d-flex flex-column w-100">
                                
                                <div class="d-flex flex-row">

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Désignation</span>
                                            <input class="fs-small mt-1" placeholder="Entrez une désignation">
                                        </div>
                                    </div>

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Prix de vente</span>
                                            <input class="fs-small mt-1" placeholder="Entrez un prix">
                                        </div>
                                    </div>

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">TVA</span>
                                            <input class="fs-small mt-1" placeholder="Entrez un taux de tva">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-end align-items-center mt-2">
                            <button class="success-button">
                                <span class="mdi mdi-plus text-white"></span>
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
                `
            break;
            case 'open-familles-button':
                modalContent = `
                <div class="card familles-menu animate__animated animate__bounceIn">
                    <div class="header d-flex flex-row justify-content-end">
                        <a href="#" class="closeModal">
                            <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                        </a> 
                    </div>
                    <div class="card-body">

                        <div class="section select-family-section">
                            <div class="row families justify-content-center">

                                <div class="col-3 card family animate__animated animate__bounceIn">
                                    <span class="mdi mdi-shape mdi-32px m-2">
                                    </span>
                                    <div class="d-flex flex-column m-2">
                                        <span class="fw-bold fs-small">Famille 1</span>
                                        <span class="fs-small">Titre</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="section select-subfamily-section" style="display: none;">

                            <div class="row">
                                <div class="col-4 card selected-family back animate__animated animate__bounceIn">
                                    <span class="mdi mdi-chevron-left mdi-32px m-2"></span>
                                    <span class="fw-bold fs-small me-4">Famille</span>
                                </div>
                            </div>

                            <div class="row">

                                <div class="col-3 card subfamily animate__animated animate__bounceIn">
                                    <span class="mdi mdi-shape mdi-32px m-2">
                                    </span>
                                    <div class="d-flex flex-column m-2">
                                        <span class="fw-bold fs-small">Sous Fam. 1</span>
                                        <span class="fs-small">Titre</span>
                                    </div>
                                </div>

                            </div>

                        </div>
                        

                        <div class="section select-product-section h-100" style="display: none;">
                            
                            <div class="actionbar d-flex flex-row justify-content-between align-items-center">

                                    <div class="card selected-subfamily back animate__animated animate__bounceIn">
                                        <span class="mdi mdi-chevron-left mdi-32px m-2"></span>
                                        <span class="fw-bold fs-small me-4">Sous Famille</span>
                                    </div>

                                    <div class="animate__animated animate__bounceIn">
                                        <a href="#" id="first-page-button" disabled="true"><span class="mdi mdi-chevron-double-left text-blue mdi-36px"></span></a>
                                        <a href="#" id="prev-page-button" class="text-blue"><span class="mdi mdi-chevron-left text-blue mdi-36px"></span></a>
                                        <a href="#" id="next-page-button" class="text-blue"><span class="mdi mdi-chevron-right text-blue mdi-36px"></span></a>
                                        <a href="#" id="last-page-button" class="text-blue"><span class="mdi mdi-chevron-double-right text-blue mdi-36px"></span></a>
                                    </div>
                                
                            </div>

                            <div class="row justify-content-center paging-wrapper">

                                <div class="page first courant row justify-content-center">

                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    
                                </div>

                                <div class="page row justify-content-center">

                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                            
                                    
                                </div>

                                <div class="page row justify-content-center">
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    
                                </div>

                                <div class="page last row justify-content-center">
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                    <div class="col-2 card product animate__animated animate__bounceIn closeModal">
                                        <img src="assets/img/samoussabanane.jpg" height="48px" class="rounded mt-2">
                                        <span class="text-center fw-bold fs-small m-1">Product 1</span>
                                    </div>
                                </div>
                                

                            </div>

                        </div>
                        
                    </div>
                </div>
                `
            break;
            case 'open-logout-button':
                modalContent = `
                <div class="card itemdetail-menu animate__animated animate__bounceIn">
                    <div class="card-body">
                        <div class="header d-flex flex-row justify-content-end">
                            <a href="#" class="closeModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>
                        <div class="row text-blue mt-2">Êtes-vous sûr de vouloir vous déconnecter ?</div>
                        <div class="d-flex flex-row justify-content-center align-items-center mt-2">
                            <button class="cancel-button m-2 text-blue closeModal">
                                <span class="mdi mdi-close-circle-outline text-blue"></span>
                                Annuler
                            </button>
                            <button id="" class="success-button m-2 openModal">
                                <span class="mdi mdi-logout text-white"></span>
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
                `
            break;
            case 'open-logout-button-frommenu':
                modalContent = `
                <div class="card itemdetail-menu animate__animated animate__bounceIn">
                    <div class="card-body">
                        <div class="header d-flex flex-row justify-content-end">
                            <a href="#" class="closeModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>
                        <div class="row text-blue mt-2">Êtes-vous sûr de vouloir vous déconnecter ?</div>
                        <div class="d-flex flex-row justify-content-center align-items-center mt-2">
                            <button id="open-mainmenu-button" class="cancel-button m-2 text-blue openModal">
                                <span class="mdi mdi-close-circle-outline text-blue"></span>
                                Annuler
                            </button>
                            <button id="" class="success-button m-2 openModal">
                                <span class="mdi mdi-logout text-white"></span>
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
                `
            break;
            case 'confirm-reprise-button':
                modalContent = `
                <div class="card itemdetail-menu animate__animated animate__bounceIn">
                    <div class="card-body">
                        <div class="header d-flex flex-row justify-content-end">
                            <a href="#" class="closeModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>
                        <div class="d-flex flex-row text-blue mt-2"><span>Reprendre le ticket : </span> <span class="text-black fw-bold">&nbsp; 1-000000154</span> &nbsp;?</div>
                        
                        <div class="d-flex flex-row justify-content-center align-items-center mt-2">
                            <button id="attente-button" class="cancel-button m-2 text-blue openModal">
                                <span class="mdi mdi-close-circle-outline text-blue"></span>
                                Annuler
                            </button>
                            <button id="" class="success-button m-2 closeModal">
                                <span class="mdi mdi-check text-white"></span>
                                Reprendre
                            </button>
                        </div>
                        <span class="fw-light fs-small mt-1"><em>(Sauvegarde automatiquement le contenu du panier courant)</em></span>
                    </div>
                </div>
                `
            break;
            case 'open-customer-button':
                modalContent = `
                <div class="card itemdetail-menu animate__animated animate__bounceIn">
                    <div class="card-body">
                        <div class="header d-flex flex-row justify-content-end">
                            <a href="#" class="closeModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>
                        <div class="d-flex flex-row justify-content-between align-items-center">
                            
                            <div class="d-flex flex-column w-100">

                                <a href="#"><div class="card bg-card d-flex flex-row align-items-center m-1">
                                    <span class="mdi mdi-account-multiple mdi-32px m-2">
                                    </span>
                                    <div class="d-flex flex-column m-2">
                                        <span class="fw-bold fs-small">Client prédéfini</span>
                                        <span class="fs-small">Cliquez pour sélectionner</span>
                                    </div>
                                </div></a>
                                
                                <div class="d-flex flex-row">

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Nom</span>
                                            <input class="fs-small mt-1" placeholder="Entrez un nom">
                                        </div>
                                    </div>

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Prénom</span>
                                            <input class="fs-small mt-1" placeholder="Entrez un prénom">
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Adresse</span>
                                            <input class="fs-small mt-1" placeholder="Entrez une adresse">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="card col-5 bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Ville</span>
                                            <input class="fs-small mt-1" placeholder="Entrez une ville">
                                        </div>
                                    </div>
                                    <div class="card col-5 bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2">
                                            <span class="fw-bold fs-small">Code Postal</span>
                                            <input class="fs-small mt-1" placeholder="Entrez une code postal">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-end align-items-center mt-2">
                            <button class="success-button">
                                <span class="mdi mdi-plus text-white"></span>
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
                `
            break;
        }

        modalContainer.html(modalContent);

    });



    $(document).on('click', '.family, .subfamily', function(event)
    {   
        $(this).closest('.section').fadeOut(300, function()
        {
            $(this).next().fadeIn('slow')
        })

        if(event.currentTarget.classList.contains('subfamily'))
        {
            $('.page').each(function(){
                $(this).hide();
            })

            $('.page.first').fadeIn('fast')

            const gesture = new TinyGesture(document.querySelector('.select-product-section'));
            gesture.on('swipeleft', (event) => {
                navigationPaging($('.page.courant').next('.page'), 'last')
            })

            gesture.on('swiperight', (event) => {
                navigationPaging($('.page.courant').prev('.page'), 'first')
            })

            $('#first-page-button').on('click', function()
            {
                navigationPaging($('.page.first'), 'first')
            })

            $('#last-page-button').on('click', function()
            {
                navigationPaging($('.page.last'), 'last')
            })

            $('#next-page-button').on('click', function()
            {
                navigationPaging($('.page.courant').next('.page'), 'last')
            })

            $('#prev-page-button').on('click', function()
            {
                navigationPaging($('.page.courant').prev('.page'), 'first')
            })
        }
        
    });

    function navigationPaging(targetPage, boundary)
    {

        if(!$('.page.courant').hasClass(boundary))
        {
            $('.page.courant').fadeOut('fast', function()
            {
                $(this).removeClass('courant')
                targetPage.addClass('courant')
                targetPage.fadeIn('fast')
            })
        }
    }

    $(document).on('click', '.back', function(event)
    {
        $(this).closest('.section').fadeOut(300, function()
        {
            $(this).prev().fadeIn('slow')
        })
    });

    $(document).on('click', '.closeModal', function(event)
    {
        modal.removeClass('active');
        modalContainer.html('');
    });

    document.querySelectorAll('.movable').forEach((p)=>{moveItem(p)})
    // console.log(document.querySelector('.fastaction-wrapper').style.height)
    // for(let i = 0; i < 6;i++)
    // {
    //     const row = document.createElement('div')
    //     row.classList.add('row')
    //     row.classList.add('n-'+i)
    //     row.classList.add('justify-content-center')
    //     console.log(row)
    //     for(let j = 0; j < 2;j++)
    //     {
    //         const element = document.createElement('div')
    //         element.classList.add('col-6')
    //         element.classList.add('m-4')
    //         element.classList.add('snap-el')
    //         element.style.opacity = 0
    //         element.style.width = '70px'
    //         element.style.height = '70px'
    //         element.style.border = '1px solid white'
    //         element.style.borderRadius = '5px'
    //         row.appendChild(element)
    //     }
    //     document.querySelector('.snap-elements').appendChild(row)
    // }
    
});