let products = [
    {
        id: 1,
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 2,
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 3,
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 4,
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 5,
        name: 'Best Burger',
        price: 50000,
        img: 'https://yandex-images.clstorage.net/srN47n237/083015o7XSI5/2Gd0WPfm0OhyDyKRUEfxTjoIrOZL6I0B5aJ5nlquLruhGkMWf3SSfs334_HAGNCIp5pB5H8V1MO4PP4bT-0G3NxDsGzWAyXMQ5smUSDXsLqL3CziOi2tsJQXPD86S65rkWzllHgWpNxrVSQGB-xw-GL_dRW-ZDIQaVs-3-6cIWsJlyZK8BQyO_a-YhFApTJ4CtvtkzjtTtIghK3dXxoq7bZOhxSKxkZO2obWhPafcIkDrHXwLbaTw37JTz6PfZPJSEem-0Bm04jH_DMBUtTxaKh4HMOLL07zQxYN7K3qWfxWPyTW63ekbeo29uSH74OJEA1l481VMzNtia9v3D3z-WuVxmuhtXJbVZ0Q4aL20BoYeg6QWF9f4_AlnPwf6Xk_lx3XRhompAy6NtQVx8_QeQBPFuEPBVJwr6mcTd4MU4vqNcYog1dCSFVuQ8CBJJKb-6ldcmsNPANCFG6fbTg7X9ZtN1VaN4Wc-0fndTYvoqsADqazTVbyQY_ovn-9HQMZCHV1amCHUtsF_aEhkmUT6CoInVOrTW2w09Q9fMxaGPxUH_XnaqYHncgGlOeETWD50j3m4G8EAuLMeM8Nryyxy_gEBRmgZaPY16yhIpDUoim5-q8ASb_tgNNUPr4NGYlclo81JFp2xe87F3bEtUyw-OPdlRMNZvEzD-lfrEz8kZv75lf7U7YSmda9w9CANQK4CnmPgdvP3fGzJ7_-L4uaLkT91rV7BqdeiKak9ZdvUlmgDDfD7dYTMz2rbgwPfxLISIQ0KJN2Uzg1b-GDENawCnlKn9Pp7t0yoRQ-vw25yuyXXURHeWR1rYqHd9QkjNKYsi0V4Q614XHuO20PXc3CStp3JftRRLHaJkzjERNFgfhYaNzwCd9t89MHng6_S9nNBv6WpFs0xX2pNIcGxo2CG_DsNzOfR4Cxz5v_Dq8_scs5VFeLsHURqeYugLLSVQK5mUhckOlNbyGARX_M0',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
]

let wrapperList = document.querySelector('.wrapper__list')

// функция будет перебирать products получать его данные и выводить товары на сайт внутри wrapperList

function outBurgers() {
    products.forEach(item => {
        let { name, price, img } = item
        wrapperList.innerHTML +=  `
        <div class="wrapper__list-card">
                <p class="wrapper__list-count"></p>
                <img class="wrapper__list-image" src="${img}" alt="">
                <h3 class="wrapper__list-title">${name}</h3>
                <div class="wrapper__list-sub">
                    <p class="wrapper__list-text">${price} сум</p>
                    <button class="wrapper__list-btn"><img src="images/sell-icon.svg" alt=""></button>
                </div>
        </div>`
    })
    
}
outBurgers()



let burgersBtn  = document.querySelectorAll('.wrapper__list-btn'),
    btnBasket   = document.querySelector('.wrapper__navbar-btn'),
    basket      = document.querySelector('.wrapper__navbar-basket'),
    closeBasket = document.querySelector('.wrapper__navbar-close'),
    amoutBasket = document.querySelector('.warapper__navbar-count'),
    totalPrice  = document.querySelector('.wrapper__navbar-totalprice');
    
let korzina = []

btnBasket.addEventListener('click', () => basket.classList.add('active'))
closeBasket.addEventListener('click', () => basket.classList.remove('active'))

   
    
    
burgersBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        addAmount(btn)
    })
})

// Функция которая будет добавлять кол-во указаному продукту

function addAmount(btn) {
    // closest() - метод который подключаеться к  указаному родительскому элементу
    let burgerName = btn.closest('.wrapper__list-card').querySelector('.wrapper__list-title').innerHTML
    
    let currentBurger = products.find(item => item.name == burgerName)
    if(currentBurger.amount < 10) {
        currentBurger.amount++
    }
    addToKorzina(currentBurger)
}

// Добавляем выбранный продукт (бургер) в корзину 

function addToKorzina(currentBurger) {
    if(currentBurger.amount > 0) {
        if(!korzina.includes(currentBurger)) {
            korzina.push(currentBurger)
        }
    }
    outSumAndAmount()
    
}

function outSumAndAmount() {
    
    totalPrice.innerHTML = getTotalSum()
    let allAmount = getTotalAmount()
    if(allAmount > 0) {
        amoutBasket.classList.add('active')
        amoutBasket.innerHTML = allAmount
    }else {
        amoutBasket.classList.remove('active')
        amoutBasket.innerHTML = ''
    }
}

function getTotalAmount () {
    
    let sum = products.reduce((acc, item) => acc + item.amount,  0)
    return sum
}

function getTotalSum() {
    let total = 0;
    products.forEach((item) => {
        total += item.totalSum
    })
    return total + ' сумм'
}

function setInterval(){
    let interval = document.querySelector('.title')
    if(interval.innerHTML < 100){
        interval.innerHTML = setTimeout(() => setInterval(), 10) 
    }else if( interval.innerHTML = 100){
        interval.style.fontSize = '100px'
        interval.innerHTML = 100 + 'Lvl'
    }

}
setInterval()

