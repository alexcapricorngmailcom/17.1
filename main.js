// Ваша сложнейшая на данный момент задача. Переписать наш "интернетный магазин". 
// Функционал весь по сути готов, только его нужно переделать, под идейно "правильную" объектную структуру. 
// К примеру, все данные что у нас есть должны находиться в пределах одного объекта. Как его методы к примеру:
// const veryCoolShop = {
//   cart: [
//     {
//       id: 'xcds',
//       category: 'Процессоры',
//       // и т.д.
//     }
//   ]
// };

// То есть все данные должны быть внутри, как и функции должны стать методами этого объекта:
// const veryCoolShop = {
//   // ...
//   addToCart: function(id) {
//     // ваш код
//     this.card.push(/*товар*/);
//   }
//   // ...
// };

// Так же они должны обращаться ко внутренним свойствам через this. И в идеале, если у вас всё получится, 
// я хочу чтобы вызовы можно было делать цепочкой по типу:
// veryCoolShop.addToCart('xcds').showCart().addToCart('xcds').cupit();

// // можно писать и так, для удобочитаемости

// veryCoolShop
//   .addToCart('xcds')
//   .showCart()
//   .addToCart('xcds')
//   .cupit();

const objectShop = {
    money: 10000,
    cart: [],
    discount: .13,

    user: {
        firstname: 'James',
        lastname: 'Hetfield',
        email: 'jameshetfield@icloud.com',
        age: new Date('1985.01.03'),
        INN: 1034567812
    },


    goods: [
        {
            id: 'xcds', 
            category: 'Процессоры', 
            name: 'intel i7 w8', 
            price: 600
        },

        {
            id: 'asd2', 
            category: 'Материнская плата', 
            name: 'Acer b450', 
            price: 200
        },

        {
            id: 'zg82', 
            category: 'Процессоры', 
            name: 'AMD', 
            price: 900
        },

        {
            id: '1tgy', 
            category: 'Одежда', 
            name: 'Радужные', 
            price: 2.22
        },

        {
            id: 'n6ba', 
            category: 'Продукты', 
            name: 'Tomato', 
            price: 1.5
        },

        {
            id: 'kio1', 
            category: 'Процессоры', 
            name: 'Rizen', 
            price: 780.5
        },

        {
            id: 'IVAN', 
            category: 'Одежда', 
            name: 'Футболка розовая', 
            price: 40
        },

        {
            id: 'alko', 
            category: 'Алкоголь', 
            name: 'Glenfiddich 12', 
            price: 40
        },

        {
            id: 'alk1', 
            category: 'Алкоголь', 
            name: 'Glenfiddich 12', 
            price: 40
        },

        {
            id: 'alk2', 
            category: 'Алкоголь', 
            name: 'Jack Daniels', 
            price: 25
        }, 

        {
            id: 'alk3', 
            category: 'Алкоголь', 
            name: 'Pubst Blue Ribbon', 
            price: 5
        }

    ],
    
    showList: function(category) {
        let list;

        if (!category) { 
            console.log(list = this.goods);
        }
        else {
            list = this.goods.filter(function(el, i, arr) {
                return el.category.toLowerCase() == category.toLowerCase();
            });

            if ( list.length ) {
                console.log(list);
            } else {
                console.log('Такой категории нет');
            }
        }
        return this;
    },

    addToCart: function(id) {
        let item = this.goods.find(function(el) {
            return el.id == id;
        });

        if (item) {
            this.cart.push({...item});
            console.log(`В корзину добавлен товар '${item.name}'`);
        } else {
            console.log('Товар не найден!');
        }
        return this;
    },

    removeFromCart: function(id) {
        let item = this.cart.find(function(el) {
            return el.id == id;
        });
        
        let index = this.cart.indexOf(item);

        if(index >= 0) {
            this.cart.splice(index, 1);
        } else {
            console.log('Такого товара нет в корзине, повторите запрос!');
        }
        return this;
    },

    clearCart() {
        return this.cart = [];
    },

    showCart() {
        console.log(this.cart);
        return this;
    },

    roundTo(num, n = 2) {
        return Math.round( num * (10 ** parseInt(n)) ) / (10 ** parseInt(n));
    },

    cupit() {
        this.ageCheck();
        this.calcDiscount();

        let infoList = this.cart.map(function(el) {
        return `${el.name} | $${el.price}`;
        }).join('\n');

        let summ = this.cart.map(function(el) {
            return el.price;
        }).reduce(function(result, price) {
            return result + price;
        });

        summ = this.roundTo(summ);

        infoList += `\n===============\nИтоговая стоимость товаров: $${summ}`;
        infoList += `\nНа вашем счету: $${this.money}`;
        infoList += `\n\nКупи?`;

        let cond = confirm(infoList);

        if (cond) {
            let check = this.money - summ;

            if (check >= 0) {
                this.money = this.money - summ;
                // this.clearCart();
                console.log(`Списание денег со счета прошло успешно! На вашем счету: $${this.roundTo(this.money)}`);
            } else {
                console.log (`На вашем счету недостаточно денег! Стоимость товаров превышает ваш счет на $${this.roundTo(Math.abs(check))}`);
            }
        }
        return this;
    },

    calcDiscount() {
        that = this;
        let sameCategory = [];

        this.cart.forEach(function(el) {
            let cat = el.category;

            if (!sameCategory.length) {
                sameCategory.push([cat, 1]);
            } else {
                let item = sameCategory.find(function(el) {
                    return el[0] == cat;
                });

                if (item) {
                    item[1]++;
                } else {
                    sameCategory.push([cat, 1]);
                }
            }
        });

        let filtered = sameCategory.filter(function(el) {
            return el[1] >= 3;
        });

        this.cart.forEach(function(good) {
            let check = filtered.some(function(el) {
                return el[0] == good.category;
            });

            if (check) {
                let price = good.price * (1 - that.discount);
                good.price = that.roundTo(price);
            }
        });
    },

    ageCheck() {
        let currentDate = new Date();
        let temp = currentDate - this.user.age;
        let userAge = new Date(temp).getFullYear() - new Date(0).getFullYear();
    
        if (userAge < 18) {
            alert(`${this.user.firstname} ${this.user.lastname}, Вам не исполнилось 18, алкогольные напитки будут удалены из корзины`);
            this.cart = this.cart.filter(function(el){
                if (el.category != 'Алкоголь')
                return el;
            });
        }
    }
};

alert(`Привет, ${objectShop.user.firstname} ${objectShop.user.lastname}!`);

objectShop.showList();
objectShop.addToCart('1tgy').addToCart('xcds').addToCart('xcds').addToCart('xcds').addToCart('xcds').addToCart('IVAN').addToCart('zg82').addToCart('alk1').addToCart('alk2').addToCart('alk3');
objectShop.showCart().cupit();