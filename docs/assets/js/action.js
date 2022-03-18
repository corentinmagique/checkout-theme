import TinyGesture from "https://unpkg.com/tinygesture@1.1.4/TinyGesture.js";

function getNumberOfDaysInMonth(MONTH_INDEX, YEAR_INDEX) {
    return new Date(YEAR_INDEX,MONTH_INDEX + 1,0).getDate();
}

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
                                        <div class="d-flex flex-column m-2 w-100">
                                            <span class="fw-bold fs-small">Prix H.T</span>
                                            <input class="fs-small mt-1 w-100" value="0.30€">
                                        </div>
                                    </div>

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2 w-100">
                                            <span class="fw-bold fs-small">Prix T.T.C</span>
                                            <input class="fs-small mt-1 w-100" value="0.30€">
                                        </div>
                                    </div>

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2 w-100">
                                            <span class="fw-bold fs-small">TVA</span>
                                            <input class="fs-small mt-1 w-100" value="20%">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-center align-items-center mt-2">
                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2 w-100">
                                    <span class="fw-bold fs-small">Désignation</span>
                                    <input class="fs-small mt-1 w-100" value="SAMOUSSAS BANANE">
                                </div>
                            </div>

                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2 w-100">
                                    <span class="fw-bold fs-small">Code-Barres</span>
                                    <input class="fs-small mt-1 w-100" value="F0123456789">
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row">

                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2 w-100">
                                    <span class="fw-bold fs-small">Remise en %</span>
                                    <input class="fs-small mt-1 w-100" placeholder="0">
                                </div>
                            </div>

                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2 w-100">
                                    <span class="fw-bold fs-small">Remise en €</span>
                                    <input class="fs-small mt-1 w-100" placeholder="0">
                                </div>
                            </div>

                        </div>
                        <div class="d-flex flex-row justify-content-end align-items-center mt-2">
                            <button class="success-button closeModal">
                                <span class="mdi mdi-content-save text-white"></span>
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            `);
    })
    
}

function changeOptionState(target)
{
    const gesture = new TinyGesture(target);
    gesture.on('longpress', (event) => {
        target.style.backgrounColor = 'red'
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
        if(newX < -100)
            target.parentNode.remove();
        if(newX > 100)
        {
            const openModalButtons = $('.openModal');
            const closeModalButtons = $('.closeModal');
            const modal = $('#modal');
            const modalContainer = $('#modal-container');

            modal.addClass('active');
            modalContainer.html(`
                <div class="header position-absolute top-0 end-0 d-flex flex-row justify-end">
                    <a href="#" class="closeModal m-2 zizibutton d-flex flex-column justify-content-center align-items-center">
                        <span class="mdi mdi-close text-blue m-2" style="font-size: 24px;"></span>
                    </a> 
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center">
                    <button id="open-remise-button" class="modal-button animate__animated animate__bounceIn openModal2">
                        <span class="mdi mdi-tag mdi-18px"></span>
                        <span class="ms-1">Remise</span>
                    </button>
                    <button id="" class="modal-button animate__animated animate__bounceIn open-cloture-button">
                        <span class="mdi mdi-hammer-screwdriver mdi-18px"></span>
                        <span class="ms-1">Action 2</span>
                    </button>
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


    let YEAR, MONTH, DAY
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const openModalButtons = $('.openModal');
    const closeModalButtons = $('.closeModal');
    const modal = $('#modal');
    const modal2 = $('#modal2');
    const modalContainer = $('#modal-container');
    const modal2Container = $('#modal2-container');

    document.querySelectorAll(".swipe-item").forEach(initSlider);
    document.querySelectorAll(".swipe-item").forEach(doubleTap);
    $(document).on('click', '.openModal2', function(event)
    {
        var modalContent = null
        let id = event.currentTarget.id
        modal2.addClass('active')
        switch(id)
        {
            case 'open-remise-button':
                modalContent = `
                    <div class="card settings-menu animate__animated animate__bounceIn">
                        <div class="card-body">

                            <div class="header d-flex flex-row justify-content-between align-items-center">
                                <span class="text-blue fw-bold">Remises</span>
                                <a href="#" class="closeModal2">
                                    <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                                </a> 
                            </div>

                            <div class="d-flex flex-row mt-2">
                                <a href="#" class="closeModal2 me-1 mb-1"><div class="card bg-princ d-flex flex-row justify-content-center align-items-center p-3 text-blue">
                                    <span class="mdi mdi-tag"></span>
                                    <span class="ms-2 fw-bold">5%</span>
                                </div></a>

                                <a href="#" class="closeModal2 me-1 mb-1"><div class="card bg-princ d-flex flex-row justify-content-center align-items-center p-3 text-blue">
                                    <span class="mdi mdi-tag"></span>
                                    <span class="ms-2 fw-bold">10%</span>
                                </div></a>

                                <a href="#" class="closeModal2 me-1 mb-1"><div class="card bg-princ d-flex flex-row justify-content-center align-items-center p-3 text-blue">
                                    <span class="mdi mdi-tag"></span>
                                    <span class="ms-2 fw-bold">15%</span>
                                </div></a>

                                <a href="#" class="closeModal2 mb-1"><div class="card bg-princ d-flex flex-row justify-content-center align-items-center p-3 text-blue">
                                    <span class="mdi mdi-tag"></span>
                                    <span class="ms-2 fw-bold">20%</span>
                                </div></a>

                            </div>

                            <a href="#" class="closeModal2"><div class="card bg-princ d-flex flex-row justify-content-start align-items-center p-3 mb-1 text-blue">
                                <span class="mdi mdi-reload"></span>
                                <span class="ms-2 fw-bold">Arrondi</span>
                            </div></a>

                            <a href="#" class="closeModal2"><div class="card bg-princ d-flex flex-row justify-content-start align-items-center p-3 mb-1 text-blue">
                                <span class="mdi mdi-gift"></span>
                                <span class="ms-2 fw-bold">Offert</span>
                            </div></a>

                            <a href="#" class="openModal2 text-blue" id="open-customremise-button"><div class="card bg-princ d-flex flex-row justify-content-start align-items-center p-3 text-blue">
                                <span class="mdi mdi-tag-multiple"></span>
                                <span class="ms-2 fw-bold">Autres remises</span>
                            </div></a>

                        </div>
                    </div>
                `
                break;
                case 'open-customremise-button':
                    modalContent = `
                    <div class="card settings-menu animate__animated animate__bounceIn">
                        <div class="card-body">

                            <div class="header d-flex flex-row justify-content-between align-items-center">
                                <span class="text-blue fw-bold">Autres remises</span>
                                <a href="#" id="open-remise-button" class="openModal2">
                                    <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                                </a> 
                            </div>

                            <div class="d-flex flex-row justify-content-center mt-2">
                                
                                <div dt-type-selector="€" class="card devise-selector active d-flex flex-row justify-content-center align-items-center me-1 mb-1 p-3 text-blue">
                                    <span class="mdi mdi-currency-eur"></span>
                                </div>

                                <div dt-type-selector="%" class="card devise-selector d-flex flex-row justify-content-center align-items-center me-1 mb-1 p-3 text-blue">
                                    <span class="mdi mdi-percent-outline"></span>
                                </div>

                            </div>

                            <div class="d-flex flex-row justify-content-center mt-2">
                                <input class="text-center montant fw-bold" style="font-size: 1.5em;border: none !important;outline: none !important;" value="0,00">
                            </div>

                            <div class="keyboard d-flex flex-column justify-content-center mt-2 animate__animated animate__bounceIn">
                                <div class="d-flex flex-row justify-content-center">   
                                    <a href="#" dt-key-value="1" class="keyboard-button"><span>1</span></a>
                                    <a href="#" dt-key-value="2" class="keyboard-button"><span>2</span></a>
                                    <a href="#" dt-key-value="3" class="keyboard-button"><span>3</span></a>
                                </div>
                                <div class="d-flex flex-row justify-content-center">  
                                    <a href="#" dt-key-value="4" class="keyboard-button"><span>4</span></a>
                                    <a href="#" dt-key-value="5" class="keyboard-button"><span>5</span></a>
                                    <a href="#" dt-key-value="6" class="keyboard-button"><span>6</span></a>
                                </div>
                                <div class="d-flex flex-row justify-content-center">   
                                    <a href="#" dt-key-value="7" class="keyboard-button"><span>7</span></a>
                                    <a href="#" dt-key-value="8" class="keyboard-button"><span>8</span></a>
                                    <a href="#" dt-key-value="9" class="keyboard-button"><span>9</span></a>
                                </div>
                                <div class="d-flex flex-row justify-content-center">   
                                    <a href="#" dt-key-value="DEL" class="keyboard-button"><span class="mdi mdi-backspace"></span></a>
                                    <a href="#" dt-key-value="0" class="keyboard-button"><span>0</span></a>
                                    <a href="#" dt-key-value="." class="keyboard-button"><span>,</span></a>
                                </div>
                                
                            </div>

                            <div class="d-flex flex-row justify-content-center mb-3">   
                                <a href="#" id="" class="closeModal2 validate-button d-flex flex-row justify-content-center"><span class="mdi mdi-check-all me-3"></span><span>Valider</span></a>
                            </div>

                        </div>
                    </div>
                    `
                break;
                case 'open-selectdate-button':
                    modalContent = `
                    <div class="card animate__animated animate__bounceIn">
                        <div class="card-body">

                            <div class="header d-flex flex-row justify-content-end">
                                <a href="#" class="closeModal2">
                                    <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                                </a> 
                            </div>

                            <div class="d-flex flex-row align-items-center">

                                <div class="d-flex flex-column align-items-center">
                                    <a href="#" class="date_selector" dt-date-selector="next_day"><span class="mdi mdi-chevron-up mdi-24px text-blue"></span></a>
                                    <input class="date-picker day" value="16">
                                    <a href="#" class="date_selector" dt-date-selector="prev_day"><span class="mdi mdi-chevron-down mdi-24px text-blue"></span></a>
                                </div>

                                <div class="d-flex flex-column align-items-center">
                                    <a href="#" class="date_selector" dt-date-selector="next_month"><span class="mdi mdi-chevron-up mdi-24px text-blue"></span></a>
                                    <input class="date-picker month" value="Février">
                                    <a href="#" class="date_selector" dt-date-selector="prev_month"><span class="mdi mdi-chevron-down mdi-24px text-blue"></span></a>
                                </div>

                                <div class="d-flex flex-column align-items-center">
                                    <a href="#" class="date_selector" dt-date-selector="next_year"><span class="mdi mdi-chevron-up mdi-24px text-blue"></span></a>
                                    <input class="date-picker year" value="2022">
                                    <a href="#" class="date_selector" dt-date-selector="prev_year"><span class="mdi mdi-chevron-down mdi-24px text-blue"></span></a>
                                </div>

                            </div>
                            
                            <div class="d-flex flex-row justify-content-end align-items-center mt-2">
                                <button dt-date-selector="select" class="success-button m-2 closeModal2">
                                    <span class="mdi mdi-check-all text-white"></span>
                                    Sélectionner
                                </button>
                            </div>

                        </div>
                    </div>
                    `
                    break;
                    case 'open-actionticket-button':
                        modalContent = `
                        <div class="header position-absolute top-0 end-0 d-flex flex-row justify-end">
                            <a href="#" class="closeModal2 m-2 zizibutton d-flex flex-column justify-content-center align-items-center">
                                <span class="mdi mdi-close text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>

                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <button id="" class="modal-button animate__animated animate__bounceIn closeModal closeModal2">
                                <span class="mdi mdi-restart mdi-18px"></span>
                                <span class="ms-1">Reprendre</span>
                            </button>
                            <button id="" class="modal-button animate__animated animate__bounceIn">
                                <span class="mdi mdi-hammer-screwdriver mdi-18px"></span>
                                <span class="ms-1">Action 2</span>
                            </button>
                        </div>
                        `
                        break;
        }

        modal2Container.html(modalContent)

        YEAR = $('.date-picker.year').val()
        MONTH = months.indexOf($('.date-picker.month').val())
        DAY = $('.date-picker.day').val()

    })

    $(document).on('click', '.openModal', function(event)
    {
        var modalContent = null;
        let id = event.currentTarget.id
        modal.addClass('active');
        // console.log(event.currentTarget)
        switch(id)
        {
            case 'open-mainmenu-button':
                modalContent = `
                    <div class="header position-absolute top-0 end-0 d-flex flex-row justify-end">
                        <a href="#" class="closeModal zizibutton m-2 d-flex flex-column justify-content-center align-items-center">
                            <span class="mdi mdi-close text-blue m-2" style="font-size: 24px;"></span>
                        </a> 
                    </div>
                    <div class="d-flex flex-row">

                        <a href="#" id="open-tickets-button" class="openModal"><div class="d-flex flex-column justify-content-center align-items-center m-2">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#CBEBFF;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/ticket.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Tickets</span>
                        </div></a>

                        <div class="d-flex flex-column justify-content-center align-items-center m-2">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#CBEBFF;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/customer-service.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">SAV</span>
                        </div>

                        <div class="d-flex flex-column justify-content-center align-items-center m-2">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#FDFDFC;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/online-shop.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Teamstore</span>
                        </div>

                        <div class="d-flex flex-column justify-content-center align-items-center m-2">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#2F3D4E;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/uber.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Uber</span>
                        </div>

                        <div class="d-flex flex-column justify-content-center align-items-center m-2">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#73C5B7;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/please.jpg" class="rounded">
                                </div>
                            </div>
                            <span class="text-white mt-2">Please</span>
                        </div>

                        <div class="d-flex flex-column justify-content-center align-items-center m-2">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#F6634B;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/chrome.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Chrome</span>
                        </div>

                        <div class="d-flex flex-column justify-content-center align-items-center m-2">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#CBEBFF;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/gift-card.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Fidelité</span>
                        </div>

                        <a href="#" id="open-settings-button" class="openModal"><div class="d-flex flex-column justify-content-center align-items-center m-2">
                            <div class="card menu-icon animate__animated animate__bounceIn" style="background-color:#CBEBFF;">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <img height="32px" src="assets/img/cog.png">
                                </div>
                            </div>
                            <span class="text-white mt-2">Paramètres</span>
                        </div></a>

                    </div>
                    <div class="d-flex flex-row">

                        

                    </div>
                    <div class="d-flex flex-row mt-5">
                        <button id="open-logout-button-frommenu" class="modal-button animate__animated animate__bounceIn openModal">
                            <span class="mdi mdi-logout mdi-18px"></span>
                            <span>Déconnexion</span>
                        </button>
                        <button id="open-cloture-button" class="modal-button animate__animated animate__bounceIn openModal open-cloture-button">
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
                                <a href="#" id="open-mainmenu-button" class="openModal">
                                    <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                                </a> 
                            </div>
                            <div class="card">
                                <div class="payment-method fs-small">
                                    <ul>
                                        
                                        <li class="indicator active first">
                                            <a href="#" id="espece-button" class="row">
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

                                        <li class="indicator">
                                            <a href="#" id="cb-button" class="row">
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

                                        <li class="indicator">
                                            <a href="#" id="cheque-button" class="row">
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

                                        <li class="indicator last">
                                            <a href="#" id="titre-button" class="row">
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
                                    
                                    <div class="page first courant espece row justify-content-center">
                                        <div class="row justify-content-center mt-1 w-50">
                                            <div class="card w-100 bg-blue">
                                                <h6 class="text-white m-2 d-flex flex-row justify-content-between align-items-center"><span>Votre recette en espèce</span> <span class="fs-small fw-lighter text-white m-2">0,00€</span></h6>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row justify-content-center mt-3">
                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/1cent.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/2cent.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/5cent.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/10cent.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row justify-content-center mt-3">
                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/20cent.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/50cent.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/1euro.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/2euro.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row justify-content-center mt-3">
                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/5euro.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/10euro.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/20euro.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/50euro.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row justify-content-center mt-3">
                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/100euro.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/200euro.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><img src="assets/img/500euro.png" height="36px"></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>

                                            <div class="card espece-element d-flex flex-column justify-content-center align-items-center m-2">
                                                <div class="card-header bg-white"><span class="fs-small fw-bold text-blue">Fond de départ</span></div>
                                                <span class="text-white fw-bold">0</span>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div class="page row cb">
                                        <div class="row justify-content-center mt-1">
                                            <div class="card bg-blue">
                                                <h6 class="text-white m-2 d-flex flex-row justify-content-between align-items-center"><span>Votre recette en CB</span> <span class="fs-small fw-lighter text-white m-2">0,00€</span></h6>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-column mt-3">
                                            <div class="card bg-blue d-flex flex-row justify-content-between align-items-center p-2 m-1">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="assets/img/nfc-card.png" height="32px" class="m-2">
                                                    <span class="fw-bold fs-small text-white m-2">Sans contact</span>
                                                </div>
                                                <span class="fs-small fw-lighter text-white m-2">0,00€</span>
                                            </div>

                                            <div class="card bg-blue d-flex flex-row justify-content-between align-items-center p-2 m-1">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="assets/img/credit-card.png" height="32px" class="m-2">
                                                    <span class="fw-bold fs-small text-white m-2">Contact</span>
                                                </div>
                                                <span class="fs-small fw-lighter text-white m-2">0,00€</span>
                                            </div>

                                            <div class="card bg-blue d-flex flex-row justify-content-between align-items-center p-2 m-1">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="assets/img/amex.png" height="32px" class="m-2">
                                                    <span class="fw-bold fs-small text-white m-2">American Express (AMEX)</span>
                                                </div>
                                                <span class="fs-small fw-lighter text-white m-2">0,00€</span>
                                            </div>

                                            <div class="card bg-blue d-flex flex-row justify-content-between align-items-center p-2 m-1">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="assets/img/timetable.png" height="32px" class="m-2">
                                                    <span class="fw-bold fs-small text-white m-2">Paiement n fois (pnf)</span>
                                                </div>
                                                <span class="fs-small fw-lighter text-white m-2">0,00€</span>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="page row cheque">
                                        <div class="row justify-content-center mt-1">
                                            <div class="card bg-blue">
                                                <h6 class="text-white m-2 d-flex flex-row justify-content-between align-items-center"><span>Votre recette en chèque</span> <span class="fs-small fw-lighter text-white m-2">0,00€</span></h6>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-column mt-3">
                                            <div class="card bg-blue d-flex flex-row justify-content-between align-items-center p-2 m-1">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="assets/img/cheque.png" height="32px" class="m-2">
                                                    <span class="fw-bold fs-small text-white m-2">Chèque</span>
                                                </div>
                                                <span class="fs-small fw-lighter text-white m-2">0,00€</span>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="page last titre row">
                                        <div class="row justify-content-center mt-1">
                                            <div class="card bg-blue">
                                                <h6 class="text-white m-2 d-flex flex-row justify-content-between align-items-center"><span>Votre recette en titre</span> <span class="fs-small fw-lighter text-white m-2">0,00€</span></h6>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-column mt-3">
                                            <div class="card bg-blue d-flex flex-row justify-content-between align-items-center p-2 m-1">
                                                <div class="d-flex flex-row align-items-center">
                                                    <img src="assets/img/ticket.png" height="32px" class="m-2">
                                                    <span class="fw-bold fs-small text-white m-2">Titre</span>
                                                </div>
                                                <span class="fs-small fw-lighter text-white m-2">0,00€</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                
                            </div>
                            
                        </div>
                        <div class="d-flex flex-row justify-content-end">
                            
                            <button id="cloture-recap-button" class="success-button m-2 openModal">
                                <span class="mdi mdi-file-document text-white"></span>
                                Enregistrer et Clotûrer
                            </button>
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

                    <div class="row w-100 justify-content-start mt-1">
                        <h6 class="text-white fw-bold ms-3">Tickets en attente de : <span class="fw-light">N789456321</span></h6>

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

                    <div class="row w-100 justify-content-start mt-1">
                        <h6 class="text-white fw-bold ms-3">Tickets en attente de : <span class="fw-light">N123456789</span></h6>

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
                modalContent = `
                    <div class="payment-menu d-flex justify-content-center align-items-center animate__animated animate__bounceIn d-flex flex-row mt-3">
                        <div class="keyboard-part d-flex flex-column">
                            <div class="header d-flex flex-row justify-content-between">
                                <a href="#" class="closeModal">
                                    <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                                </a> 
                            </div>

                            <div class="d-flex flex-row justify-content-center mt-2">
                                <input class="text-center montant fw-bold" style="font-size: 1.5em;border: none !important;outline: none !important;" value="100,00">
                            </div>

                            <a href="#" id="active-discount-button" class="d-flex flex-row align-items-center justify-content-center">
                                <span class="mdi mdi-tag"></span>
                                <span class="text">Total :</span>
                                <span class="text total-montant">100,00</span>
                            </a>

                            <div class="keyboard d-flex flex-column justify-content-center mt-2 animate__animated animate__bounceIn">
                                <div class="d-flex flex-row justify-content-center">   
                                    <a href="#" dt-key-value="1" class="keyboard-button"><span>1</span></a>
                                    <a href="#" dt-key-value="2" class="keyboard-button"><span>2</span></a>
                                    <a href="#" dt-key-value="3" class="keyboard-button"><span>3</span></a>
                                </div>
                                <div class="d-flex flex-row justify-content-center">  
                                    <a href="#" dt-key-value="4" class="keyboard-button"><span>4</span></a>
                                    <a href="#" dt-key-value="5" class="keyboard-button"><span>5</span></a>
                                    <a href="#" dt-key-value="6" class="keyboard-button"><span>6</span></a>
                                </div>
                                <div class="d-flex flex-row justify-content-center">   
                                    <a href="#" dt-key-value="7" class="keyboard-button"><span>7</span></a>
                                    <a href="#" dt-key-value="8" class="keyboard-button"><span>8</span></a>
                                    <a href="#" dt-key-value="9" class="keyboard-button"><span>9</span></a>
                                </div>
                                <div class="d-flex flex-row justify-content-center">   
                                    <a href="#" dt-key-value="DEL" class="keyboard-button"><span class="mdi mdi-backspace"></span></a>
                                    <a href="#" dt-key-value="0" class="keyboard-button"><span>0</span></a>
                                    <a href="#" dt-key-value="." class="keyboard-button"><span>,</span></a>
                                </div>
                                
                            </div>

                            <div class="d-flex flex-row justify-content-center mb-3">   
                                <a href="#" id="open-remise-button" dt-key-value="REM" class="openModal2 keyboard-button remise d-flex flex-row justify-content-center"><span class="mdi mdi-sale me-3"></span><span>Remise</span></a>
                            </div>
                        </div>

                        <div class="options-part d-flex flex-column">
                            <ul>
                                <li>
                                    <a href="#" class="payment-method d-flex flex-column justify-content-center" id="espece">
                                        <div class="d-flex flex-row align-items-center">
                                            <span class="icon"><img src="assets/img/money.png" height="32px"></span>
                                            <span class="title">Espèce</span>
                                        </div>
                                        <div class="montant-text fs-small animate__animated animate__bounceIn d-none">
                                            <span class="">Montant : </span>
                                            <span class="mont fw-lighter"> 0,00 €</span>
                                        </div>
                                    </a>
                                </li>
                    
                                <li>
                                    <a href="#" class="payment-method d-flex flex-column justify-content-center" id="cb">
                                        <div class="d-flex flex-row align-items-center">
                                            <span class="icon"><img src="assets/img/credit-card.png" height="32px"></span>
                                            <span class="title">Carte</span>
                                        </div>
                                        <div class="montant-text fs-small animate__animated animate__bounceIn d-none">
                                            <span class="">Montant : </span>
                                            <span class="mont fw-lighter"> 0,00 €</span>
                                        </div>
                                    </a>
                                </li>
                    
                                <li>
                                    <a href="#" class="payment-method d-flex flex-column justify-content-center" id="cheque">
                                        <div class="d-flex flex-row align-items-center">
                                            <span class="icon"><img src="assets/img/cheque.png" height="32px"></span>
                                            <span class="title">Chèque</span>
                                        </div>
                                        <div class="montant-text fs-small animate__animated animate__bounceIn d-none">
                                            <span class="">Montant : </span>
                                            <span class="mont fw-lighter"> 0,00 €</span>
                                        </div>
                                    </a>
                                </li>
                    
                                <li>
                                    <a href="#" class="payment-method d-flex flex-column justify-content-center" id="titre">
                                        <div class="d-flex flex-row align-items-center">
                                            <span class="icon"><img src="assets/img/ticket.png" height="32px"></span>
                                            <span class="title">Titre</span>
                                        </div>
                                        <div class="montant-text fs-small animate__animated animate__bounceIn d-none">
                                            <span class="">Montant : </span>
                                            <span class="mont fw-lighter"> 0,00 €</span>
                                        </div>
                                    </a>
                                </li>
                    
                                <li>
                                    <a href="#" class="payment-method d-flex flex-column justify-content-center" id="compte">
                                        <div class="d-flex flex-row align-items-center">
                                            <span class="icon"><img src="assets/img/team.png" height="32px"></span>
                                            <span class="title">Compte</span>
                                        </div>
                                        <div class="montant-text fs-small animate__animated animate__bounceIn d-none">
                                            <span class="">Montant : </span>
                                            <span class="mont fw-lighter"> 0,00 €</span>
                                        </div>
                                    </a>
                                </li>
                    
                                <li>
                                    <a href="#" class="payment-method d-flex flex-column justify-content-center" id="avoir">
                                        <div class="d-flex flex-row align-items-center">
                                            <span class="icon"><img src="assets/img/giftbox.png" height="32px"></span>
                                            <span class="title">Avoir</span>
                                        </div>
                                        <div class="montant-text fs-small animate__animated animate__bounceIn d-none">
                                            <span class="">Montant : </span>
                                            <span class="mont fw-lighter"> 0,00 €</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                `
            break;
            case 'open-productlibre-button':
                modalContent = `
                <div class="card animate__animated animate__bounceIn">
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
                                <div class="card bg-input d-flex flex-row align-items-center m-1 w-75">
                                    <div class="d-flex flex-column w-100 m-2">
                                        <span class="fw-bold fs-small">Rechercher une famille </span>
                                        <input class="fs-small mt-1 w-100" placeholder="Famille ...">
                                    </div>
                                </div>
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

                            <div class="row justify-content-between">
                                <div class="col-4 card selected-family back animate__animated animate__bounceIn">
                                    <span class="mdi mdi-chevron-left mdi-32px m-2"></span>
                                    <span class="fw-bold fs-small me-4">Famille</span>
                                </div>

                                <div class="card bg-input d-flex flex-row align-items-center m-1 w-50">
                                    <div class="d-flex flex-column w-100 m-2">
                                        <span class="fw-bold fs-small">Rechercher une sous-famille </span>
                                        <input class="fs-small mt-1 w-100" placeholder="Sous-Famille ...">
                                    </div>
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

                                    <div class="card bg-input d-flex flex-row align-items-center m-1 w-50">
                                        <div class="d-flex flex-column w-100 m-2">
                                            <span class="fw-bold fs-small">Rechercher produit </span>
                                            <input class="fs-small mt-1 w-100" placeholder="Produit ...">
                                        </div>
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
                <div class="card animate__animated animate__bounceIn">
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
            case 'cloture-recap-button':
                modalContent = `
                <div class="card pendingticket-menu animate__animated animate__bounceIn">
                    <div class="card-body">
                        <div class="header d-flex flex-row justify-content-end">
                            <a href="#" class="closeModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>
                        <div class="d-flex flex-row text-blue mt-2"><span class="fw-bold text-black">1 &nbsp;</span> ticket(s) en attente :</div>

                        <div class="row">
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
                        <div class="d-flex flex-row justify-content-center align-items-center mt-2 position-absolute bottom-0">
                            <button id="confirm-forcecloture-button" class="cancel-button m-2 text-blue openModal">
                                <span class="mdi mdi-lock text-blue"></span>
                                Forcer la clôture
                            </button>
                            <button id="attente-button" class="success-button m-2 openModal">
                                <span class="mdi mdi-file-document text-white"></span>
                                Traiter les tickets
                            </button>
                        </div>
                    </div>
                </div>
                `
            break;
            case 'open-logout-button-frommenu':
                modalContent = `
                <div class="card animate__animated animate__bounceIn">
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
            case 'confirm-forcecloture-button':
                modalContent = `
                <div class="card animate__animated animate__bounceIn">
                    <div class="card-body">
                        <div class="header d-flex flex-row justify-content-end">
                            <a href="#" class="closeModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>
                        <div class="row text-blue mt-2">Êtes-vous sûr de vouloir abandonner les ventes en attente ?</div>
                        <div class="d-flex flex-row justify-content-center align-items-center mt-2">
                            <button id="cloture-recap-button" class="cancel-button m-2 text-blue openModal">
                                <span class="mdi mdi-close-circle-outline text-blue"></span>
                                Annuler
                            </button>
                            <button id="" class="success-button m-2 openModal">
                                <span class="mdi mdi-lock text-white"></span>
                                Poursuivre
                            </button>
                        </div>
                    </div>
                </div>
                `
            break;
            case 'confirm-reprise-button':
                modalContent = `
                <div class="card animate__animated animate__bounceIn">
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
            case 'open-newcustomer-button':
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

                                <a href="#" id="open-customer-button" class="openModal"><div class="card bg-card d-flex flex-row align-items-center m-1">
                                    <span class="mdi mdi-account-multiple mdi-32px m-2">
                                    </span>
                                    <div class="d-flex flex-column m-2">
                                        <span class="fw-bold fs-small">Client existant</span>
                                        <span class="fs-small">Cliquez pour sélectionner</span>
                                    </div>
                                </div></a>
                                
                                <div class="d-flex flex-row">

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2 w-100">
                                            <span class="fw-bold fs-small">Nom</span>
                                            <input class="fs-small mt-1 w-100" placeholder="Entrez un nom">
                                        </div>
                                    </div>

                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2 w-100">
                                            <span class="fw-bold fs-small">Prénom</span>
                                            <input class="fs-small mt-1 w-100" placeholder="Entrez un prénom">
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2 w-100">
                                            <span class="fw-bold fs-small">Numéro de téléphone</span>
                                            <input class="fs-small mt-1 w-100" placeholder="Entrez un numéro">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2 w-100">
                                            <span class="fw-bold fs-small">Adresse</span>
                                            <input class="fs-small mt-1 w-100" placeholder="Entrez une adresse">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="card col-5 bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2 w-100">
                                            <span class="fw-bold fs-small">Ville</span>
                                            <input class="fs-small mt-1 w-100" placeholder="Entrez une ville">
                                        </div>
                                    </div>
                                    <div class="card col-5 bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column m-2 w-100">
                                            <span class="fw-bold fs-small">Code Postal</span>
                                            <input class="fs-small mt-1 w-100" placeholder="Entrez une code postal">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-end align-items-center mt-2">
                            <button class="success-button closeModal">
                                <span class="mdi mdi-plus text-white"></span>
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
                `
            break;
            case 'open-customer-button':
                modalContent = `
                <div class="card customer-menu animate__animated animate__bounceIn">
                    <div class="card-body">
                        <div class="header d-flex flex-row justify-content-end">
                            <a href="#" class="closeModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>
                        <div class="d-flex flex-row justify-content-between align-items-center">
                            
                            <div class="d-flex flex-column w-100">

                                <div class="row">
                                    <div class="card bg-input d-flex flex-row align-items-center m-1">
                                        <div class="d-flex flex-column w-100 m-2">
                                            <span class="fw-bold fs-small">Rechercher</span>
                                            <input class="fs-small mt-1 w-100" placeholder="Nom, prénom, numéro de téléphone ...">
                                        </div>
                                    </div>
                                </div>

                                <a href="#" class="closeModal"><div class="card bg-card d-flex flex-row align-items-center m-1">
                                    <span class="mdi mdi-account-multiple mdi-32px m-2">
                                    </span>
                                    <div class="d-flex flex-column m-2">
                                        <span class="fw-bold fs-small">Client 1</span>
                                        <span class="fs-small">Cliquez pour sélectionner</span>
                                    </div>
                                </div></a>

                                <a href="#" class="closeModal"><div class="card bg-card d-flex flex-row align-items-center m-1">
                                    <span class="mdi mdi-account-multiple mdi-32px m-2">
                                    </span>
                                    <div class="d-flex flex-column m-2">
                                        <span class="fw-bold fs-small">Client 2</span>
                                        <span class="fs-small">Cliquez pour sélectionner</span>
                                    </div>
                                </div></a>

                                <a href="#" class="closeModal"><div class="card bg-card d-flex flex-row align-items-center m-1">
                                    <span class="mdi mdi-account-multiple mdi-32px m-2">
                                    </span>
                                    <div class="d-flex flex-column m-2">
                                        <span class="fw-bold fs-small">Client 3</span>
                                        <span class="fs-small">Cliquez pour sélectionner</span>
                                    </div>
                                </div></a>
                                
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-end align-items-center mt-2">
                            <button id="open-newcustomer-button" class="success-button openModal">
                                <span class="mdi mdi-plus text-white"></span>
                                Nouveau client
                            </button>
                        </div>
                    </div>
                </div>
                `
            break;
            case 'open-settings-button':
                modalContent = `
                <div class="card settings-menu animate__animated animate__bounceIn">
                    <div class="card-body">

                        <div class="header d-flex flex-row justify-content-between align-items-center">
                            <span class="text-blue fw-bold">Paramètres</span>
                            <a href="#" id="open-mainmenu-button" class="openModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>

                        <div class="row mt-1">

                            <div class="col-6">
                                <a href="#" id="open-geninfo-button" class="openModal"><div class="card d-flex flex-column align-items-center m-1 p-1">
                                    <span class="mdi mdi-information-outline text-blue mdi-48px"></span>
                                    <span class="fs-small text-blue">Informations générales</span>
                                </div></a>
                            </div>

                            <div class="col-6">
                                <a href="#" id="open-mdp-button" class="openModal"><div class="card d-flex flex-column align-items-center m-1 p-1">
                                    <span class="mdi mdi-credit-card-outline text-blue mdi-48px"></span>
                                    <span class="fs-small text-blue">Moyens de paiment</span>
                                </div></a>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-6">
                                <a href="#" id="" class="openModal"><div class="card d-flex flex-column align-items-center m-1 p-1">
                                    <span class="mdi mdi-tune text-blue mdi-48px"></span>
                                    <span class="fs-small text-blue">Préférences</span>
                                </div></a>
                            </div>

                            <div class="col-6">
                                <a href="#" id="" class="openModal"><div class="card d-flex flex-column align-items-center m-1 p-1">
                                    <span class="mdi mdi-printer text-blue mdi-48px"></span>
                                    <span class="fs-small text-blue">Impression</span>
                                </div></a>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-6">
                                <a href="#" id="" class="openModal"><div class="card d-flex flex-column align-items-center m-1 p-1">
                                    <span class="mdi mdi-devices text-blue mdi-48px"></span>
                                    <span class="fs-small text-blue">Périphériques</span>
                                </div></a>
                            </div>

                            <div class="col-6">
                                <a href="#" id="" class="openModal"><div class="card d-flex flex-column align-items-center m-1 p-1">
                                    <span class="mdi mdi-archive text-blue mdi-48px"></span>
                                    <span class="fs-small text-blue">Clôture et archivage</span>
                                </div></a>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-12">
                                <a href="#" id="" class="openModal"><div class="card d-flex flex-column align-items-center m-1 p-1">
                                    <span class="mdi mdi-cog-outline text-blue mdi-48px"></span>
                                    <span class="fs-small text-blue">Système</span>
                                </div></a>
                            </div>
                        </div>

                        
                        
                    </div>
                </div>
                `
            break;
            case 'open-geninfo-button':
                modalContent = `
                <div class="card infogen-menu animate__animated animate__bounceIn">
                    <div class="card-body">

                        <div class="header d-flex flex-row justify-content-between align-items-center">
                            <span class="text-blue fw-bold">Informations générales</span>
                            <a href="#" id="open-settings-button" class="openModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>

                        <div class="row mt-1">
                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2 w-100">
                                    <span class="fw-bold fs-small">Société</span>
                                    <input class="fs-small mt-1 w-100" value="NIXIA I.T">
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2 w-100">
                                    <span class="fw-bold fs-small">Adresse</span>
                                    <input class="fs-small mt-1 w-100" value="1 RUE DE LA CHEBARDE">
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-4">
                                <div class="card bg-input d-flex flex-row align-items-center m-1">
                                    <div class="d-flex flex-column m-2 w-100">
                                        <span class="fw-bold fs-small">Code postal</span>
                                        <input class="fs-small mt-1 w-100" value="63000">
                                    </div>
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="card bg-input d-flex flex-row align-items-center m-1">
                                    <div class="d-flex flex-column m-2 w-100">
                                        <span class="fw-bold fs-small">Ville</span>
                                        <input class="fs-small mt-1 w-100" value="AUBIERE">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2 w-100">
                                    <span class="fw-bold fs-small">Téléphone</span>
                                    <input class="fs-small mt-1 w-100" value="0692572483">
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2 w-100">
                                    <span class="fw-bold fs-small">Mail</span>
                                    <input class="fs-small mt-1 w-100" value="contact@nixia.fr">
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-8">
                                <div class="card bg-input d-flex flex-row align-items-center m-1">
                                    <div class="d-flex flex-column m-2 w-100">
                                        <span class="fw-bold fs-small">Siret</span>
                                        <input class="fs-small mt-1 w-100" value="1234567890N">
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="card bg-input d-flex flex-row align-items-center m-1">
                                    <div class="d-flex flex-column m-2 w-100">
                                        <span class="fw-bold fs-small">APE</span>
                                        <input class="fs-small mt-1 w-100" value="C KOA SA">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="card bg-input d-flex flex-row align-items-center m-1">
                                <div class="d-flex flex-column m-2 w-100">
                                    <span class="fw-bold fs-small">Numéro de TVA</span>
                                    <input class="fs-small mt-1 w-100" value="-">
                                </div>
                            </div>
                        </div>

                        <div class="row justify-content-end align-items-center mt-2">
                            <button id="open-settings-button" class="success-button openModal">
                                <span class="mdi mdi-content-save text-white"></span>
                                Sauvegarder
                            </button>
                        </div>

                    </div>
                </div>
                `
            break;
            case 'open-mdp-button':
                modalContent = `
                <div class="card mdp-menu animate__animated animate__bounceIn">
                    <div class="card-body">

                        <div class="header d-flex flex-row justify-content-between align-items-center">
                            <span class="text-blue fw-bold">Moyens de paiment</span>
                            <a href="#" id="open-settings-button" class="openModal">
                                <span class="mdi mdi-close-circle text-blue m-2" style="font-size: 24px;"></span>
                            </a> 
                        </div>

                        <span class="fs-small text-blue"><em>(Appuyez longuement sur l'option pour la changer)</em></span>

                        <div class="row mt-3">
                            <div class="card option d-flex flex-row justify-content-between align-items-center p-3">
                                <span class="fw-bold text-white fs-small">Espèce</span>
                                <span class="fw-lighter text-white fs-small"><em>Activé</em></span>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="card option d-flex flex-row justify-content-between align-items-center p-3">
                                <span class="fw-bold text-white fs-small">CB</span>
                                <span class="fw-lighter text-white fs-small"><em>Activé</em></span>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="card option d-flex flex-row justify-content-between align-items-center p-3">
                                <span class="fw-bold text-white fs-small">Chèques</span>
                                <span class="fw-lighter text-white fs-small"><em>Activé</em></span>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="card option d-flex flex-row justify-content-between align-items-center p-3">
                                <span class="fw-bold text-white fs-small">Titre</span>
                                <span class="fw-lighter text-white fs-small"><em>Activé</em></span>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="card option d-flex flex-row justify-content-between align-items-center p-3">
                                <span class="fw-bold text-white fs-small">Mise en compte client</span>
                                <span class="fw-lighter text-white fs-small"><em>Activé</em></span>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="card option d-flex flex-row justify-content-between align-items-center p-3">
                                <span class="fw-bold text-white fs-small">Avoir</span>
                                <span class="fw-lighter text-white fs-small"><em>Activé</em></span>
                            </div>
                        </div>

                    </div>
                </div>
                `
            break;
            case 'open-tickets-button':
                modalContent = `
                    <div class="header d-flex flex-row justify-content-between align-items-center position-absolute top-0 w-100">
                        <div class="d-flex flex-row align-items-center">

                            <a href="#" id="open-mainmenu-button" class="openModal zizibutton m-2 d-flex flex-column justify-content-center align-items-center">
                                <span class="mdi mdi-close text-blue m-2" style="font-size: 24px;"></span>
                            </a> 

                            <div class="position-relative">
                                <span class="mdi mdi-24px mdi-magnify text-blue position-absolute pt-2 ps-3"></span>
                                <input type="text" class="m-2 fs-small ps-5" placeholder="Rechercher un ticket ...">
                            </div>

                        </div>    
                        
                        <div class="d-flex flex-row align-items-center me-3">
                            <div class="d-flex flex-row align-items-center">
                                <a href="#" class="text-lightblue"><span class="mdi mdi-chevron-left mdi-36px "></span></a>
                                <span class="curent-ticket-page text-white m-1">1</span>
                                <span class="page-separator text-white">/</span>
                                <span class="total-ticket-page text-white m-1">1</span>
                                <a href="#" class="text-lightblue"><span class="mdi mdi-chevron-right mdi-36px"></span></a>
                            </div>
                            <a href="#" id="open-selectdate-button" class="text-lightblue fs-small d-flex flex-row align-items-center ms-3 openModal2"><div class="calendar-button d-flex flex-row align-items-center">
                                <span class="mdi mdi-calendar-month mdi-18px"></span>
                                <span class="ms-1 date-text">16 Février 2022</span>
                            </div></a>
                        </div>
                        
                    </div>

                    <div class="row w-100 justify-content-center">
                        
                        <div class="col-2 confirmed-ticket card m-2 p-2 openModal2 animate__animated animate__bounceIn" id="open-actionticket-button">
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
        }

        modalContainer.html(modalContent);

    });

    $(document).on('click', '.open-cloture-button', function()
    {
        $('.page').each(function(){
            $(this).hide()
        })

        $('.page.first').fadeIn('fast')

        const gesture = new TinyGesture(document.querySelector('.cloture-menu'));
        gesture.on('swipeup', (event) => {
            switchActiveIndicator('next')
            navigationPaging($('.page.courant').next('.page'), 'last')
        })

        gesture.on('swipedown', (event) => {
            switchActiveIndicator('prev')
            navigationPaging($('.page.courant').prev('.page'), 'first')
        })

        $('#espece-button').on('click', function(){changePage($(this), $('.espece'))})

        $('#cb-button').on('click', function(){changePage($(this), $('.cb'))})

        $('#cheque-button').on('click', function(){changePage($(this), $('.cheque'))})

        $('#titre-button').on('click', function(){changePage($(this), $('.titre'))})

    })

    function changePage(current, pageName)
    {
        $('.indicator.active').removeClass('active')
        current.closest('.indicator').addClass('active')
        $('.page.courant').fadeOut('fast', function()
        {
            $(this).removeClass('courant')
            pageName.fadeIn('fast', function()
            {
                $(this).addClass('courant')
            })
        })
    }

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

    function switchActiveIndicator(direction)
    {

            var nextLi
            
            if(direction == 'next' && !$('.indicator.active').hasClass('last'))
            {
                nextLi = $('.indicator.active').next('li')
                $('.indicator.active').removeClass('active')
                nextLi.addClass('active');
            }
                
            else if(direction == 'prev' && !$('.indicator.active').hasClass('first'))
            {
                nextLi = $('.indicator.active').prev('li')
                $('.indicator.active').removeClass('active')
                nextLi.addClass('active');
            }

    }

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

    $(document).on('click', '#open-paymentmenu-button', function(event)
    {
        $('input.montant').select()
    })

    $(document).on('click', '.payment-method', function(event)
    {
        let method_text
        let target = event.currentTarget

        let montant_total = parseFloat($('.total-montant').text())
        let current_montant = parseFloat($('input.montant').val())

        $('#'+target.id+' .montant-text').removeClass('d-none')

        $('#'+target.id+' .mont').text(current_montant)
        $('input.montant').val(montant_total - current_montant)

    })

    $(document).on('click', '.devise-selector', function(event)
    {
        let type = event.currentTarget.getAttribute('dt-type-selector')
        
        $('.devise-selector.active').removeClass('active')
        $(this).addClass('active')


    })

    $(document).on('click', 'a.remise', function(event)
    {
        let montant = $('.montant').val()
        let new_montant = 0;
        let remise = event.currentTarget.getAttribute('dt-remise-value')
        
        switch(remise)
        {
            case 'custom':
                
                break;

            default:
                let reduction = montant * (event.currentTarget.getAttribute('dt-remise-value')/100)
                new_montant = montant - reduction
                $('.montant').val(new_montant)
                break;

        }

    })

    $(document).on('click', '.keyboard-button', function(event)
    {
        let montant = $('.montant').val()
        let new_montant = 0;

        let key = event.currentTarget.getAttribute('dt-key-value')
        
        switch(key)
        {
            case 'DEL':
                new_montant = montant.slice(0, -1)
                $('.montant').val(new_montant)
                break;

            case 'REM':
                $('.remise-button').toggleClass('d-none')
                break;
            default:
                new_montant = montant + event.currentTarget.getAttribute('dt-key-value')
                $('.montant').val(new_montant)
                break;

        }
        
    })

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

    $(document).on('click', '.closeModal2', function(event)
    {
        modal2.removeClass('active');
        modal2Container.html('');
    });

    document.querySelectorAll('.movable').forEach((p)=>{moveItem(p)})
    // console.log(document.querySelector('.fastaction-wrapper').style.height)
    // for(let i = 0; i < 6;i++)
    // {
    //     const row = document.createElement('div')
    //     row.classList.add('row')
    //     row.classList.add('n-'+i)
    //     row.classList.add('justify-content-center')
        
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

    $(document).on('click', '#open-remise-button', function(event)
    {
        
    })
    $(document).on('click', '#open-mdp-button', function()
    {
        document.querySelectorAll('.option').forEach(el => {changeOptionState(el)})
    })

    $(document).on('click', '.date_selector', function(event)
    {   
        
        var day = parseInt($('.date-picker.day').val())
        var month = months.indexOf($('.date-picker.month').val())
        var year = $('.date-picker.year').val()

        const num_days = getNumberOfDaysInMonth(month, year)
        let selector = event.currentTarget.getAttribute('dt-date-selector')
        switch(selector)
        {
            case 'next_day':
                if(day < num_days) ++day
            break;
            case 'prev_day':
                if(day > 1) --day
            break;
            case 'next_month':
                month = (month + 1) % 12
            break;
            case 'prev_month':
                if(month>0)
                    month = (month - 1)
                else month = 11
            break;
            case 'next_year':
                ++year
            break;
            case 'prev_year':
                if(year > 0) --year
            break;
        }

        $('.date-picker.day').val(day)
        $('.date-picker.month').val(months[month])
        $('.date-picker.year').val(year)

        DAY = day
        MONTH = month
        YEAR = year

    })

    $(document).on('click', '[dt-date-selector="select"]', function(event)
    {
        $('.date-text').text(DAY + ' ' + months[MONTH] + ' ' + YEAR)
    })

});
