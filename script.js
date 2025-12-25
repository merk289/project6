const gameItems = document.querySelectorAll('.game-item');
const gameContainers = document.querySelectorAll('.game-container');
const currentGameTitle = document.getElementById('current-game');

gameItems.forEach(item => {
    item.addEventListener('click', function() {
        gameItems.forEach(i => i.classList.remove('active'));
        gameContainers.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const gameId = this.getAttribute('data-game');
        document.getElementById(gameId).classList.add('active');
        updateGameTitle(gameId);
    });
});

function updateGameTitle(gameId) {
    const titles = {
        'pubg': 'PUBG Mobile UC',
        'genshin': 'Genshin Impact - Genesis Crystals',
        'honkai': 'Honkai: Star Rail - Сущности',
        'zzz': 'Zenless Zone Zero - Монокромы',
        'arena': 'Arena Breakout - Облигации'
    };
    currentGameTitle.textContent = titles[gameId] || 'GameRefill';
}

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.fa-chevron-down');
        document.querySelectorAll('.faq-answer').forEach(ans => {
            if (ans !== answer && ans.classList.contains('active')) {
                ans.classList.remove('active');
                const otherIcon = ans.previousElementSibling.querySelector('.fa-chevron-down');
                otherIcon.classList.remove('fa-chevron-up');
                otherIcon.classList.add('fa-chevron-down');
            }
        });
        answer.classList.toggle('active');
        if (answer.classList.contains('active')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

document.querySelectorAll('.package-item').forEach(pack => {
    pack.addEventListener('click', function() {
        const gameContainer = this.closest('.game-container');
        gameContainer.querySelectorAll('.package-item').forEach(p => {
            p.classList.remove('selected');
        });
        gameContainer.querySelectorAll('.clickable-offer').forEach(o => {
            o.classList.remove('selected');
        });
        this.classList.add('selected');
        updateBuyButton(this);
    });
});

document.querySelectorAll('.clickable-offer').forEach(offer => {
    offer.addEventListener('click', function() {
        const gameContainer = this.closest('.game-container');
        gameContainer.querySelectorAll('.package-item').forEach(p => {
            p.classList.remove('selected');
        });
        gameContainer.querySelectorAll('.clickable-offer').forEach(o => {
            o.classList.remove('selected');
        });
        this.classList.add('selected');
        updateBuyButton(this);
    });
});

function updateBuyButton(element) {
    const gameContainer = element.closest('.game-container');
    const amount = element.querySelector('.package-amount') ? 
        element.querySelector('.package-amount').textContent : 
        element.querySelector('.offer-amount').textContent;
    const price = element.querySelector('.package-price') ? 
        element.querySelector('.package-price').textContent : 
        element.querySelector('.offer-price').textContent;
    const buyBtn = gameContainer.querySelector('.buy-btn');
    
    if (buyBtn) {
        buyBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Купить за ${price} (${amount})`;
    }
}

document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const gameContainer = this.closest('.game-container');
        const gameId = gameContainer.id;
        let isValid = true;
        let message = '';
        
        switch(gameId) {
            case 'pubg':
                const pubgUid = document.getElementById('pubg-uid').value;
                const pubgConfirmUid = document.getElementById('pubg-confirm-uid').value;
                if (!pubgUid || !pubgConfirmUid) {
                    isValid = false;
                    message = 'Пожалуйста, заполните оба поля с UID!';
                } else if (pubgUid !== pubgConfirmUid) {
                    isValid = false;
                    message = 'Введенные UID не совпадают!';
                }
                break;
                
            case 'genshin':
                const genshinUid = document.getElementById('genshin-uid').value;
                if (!genshinUid) {
                    isValid = false;
                    message = 'Пожалуйста, введите UID!';
                }
                break;
                
            case 'honkai':
                const honkaiUid = document.getElementById('honkai-uid').value;
                if (!honkaiUid) {
                    isValid = false;
                    message = 'Пожалуйста, введите UID!';
                }
                break;
                
            case 'zzz':
                const zzzUid = document.getElementById('zzz-uid').value;
                if (!zzzUid) {
                    isValid = false;
                    message = 'Пожалуйста, введите UID!';
                }
                break;
                
            case 'arena':
                const arenaUid = document.getElementById('arena-uid').value;
                if (!arenaUid) {
                    isValid = false;
                    message = 'Пожалуйста, введите UID!';
                }
                break;
        }
        
        if (!isValid) {
            alert(message);
            return;
        }
        alert('Заказ обрабатывается... Перенаправляем на страницу оплаты.');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.game-container').forEach(container => {
        const firstPackage = container.querySelector('.package-item');
        if (firstPackage) {
            firstPackage.classList.add('selected');
        }
    });
});