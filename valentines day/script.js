const valentineContainer = document.getElementById('valentine-container');
const starsContainer = document.querySelector('.stars');

const images = [
    // Images from the original script.js
    '../images/420596328_1549127032578457_7498673087055038151_n.jpg',
    '../images/420719328_787001726596693_2058657544292985491_n.jpg',
    '../images/420727634_900188641597410_5177402367945942725_n.jpg',
    '../images/420798478_1110907433259273_3533775255924874693_n.jpg',
    '../images/420836660_400346459147529_5807493590068416950_n.jpg',
    '../images/421029628_1105851440840327_3614398274190223264_n.jpg',
    '../images/421096862_269078016036034_3355660811234311571_n.jpg',
    '../images/349955412_803785708036261_7174560416103218368_n.jpg',
    '../images/364211129_841647373978036_1101409574070718941_n.jpg',
    '../images/350675046_213390574843457_6894265948286730426_n.jpg',
    '../images/355828920_1218155089583428_2158083698633139774_n.jpg',
    '../images/356958646_661069062129056_7817698087367648558_n.jpg',
    '../images/368391496_1076726129979015_1229612080873034180_n.jpg',
    '../images/370161587_2927896714011522_3519474620252464585_n.jpg',
    '../images/411553475_400057362456532_2774127452553443298_n.jpg',
    '../images/420837861_1094203338386702_2179084475436273020_n.jpg',
    '../images/421048471_326291323155967_1048446492456831082_n.jpg',
    '../images/421125997_686612106974985_62209606297060134_n.jpg',
    '../images/421221167_1041079840510271_2626646377876319043_n.jpg',
    '../images/421290733_709901597791506_4799595035928335814_n.jpg',
    '../images/433927371_1894175597652111_7373829823926652741_n.jpg',
    '../images/434101388_759378136333150_4356769089126839985_n.jpg',
    '../images/435850333_333271789367423_5512370101809953799_n.jpg',
    '../images/437779254_443796211352351_5373647360145801953_n.jpg',
    '../images/437783954_445522111267722_4353741902309449567_n.jpg',
    '../images/437785207_740226151530615_30063697815519716_n.jpg',
    '../images/437789704_1446575855951284_612568505785691628_n.jpg',
    '../images/437789708_957957499447766_8999863996103401218_n.jpg',
    '../images/437790029_901776408303428_455657177011497240_n.jpg',
    '../images/437798186_798265122210948_7862850561556779197_n.jpg',
    '../images/437803849_1410248449880839_1462915180099004088_n.jpg',
    '../images/437852168_441056654959455_3412272451558039961_n.jpg',
    '../images/437858469_732935122337761_6885932048284625152_n.jpg',
    '../images/437859183_305581809055083_2791735490524603019_n.jpg',
    '../images/437864710_808917391261739_7154101220632747319_n.jpg',
    '../images/437870514_452856840541290_8654934642802344303_n.jpg',
    '../images/437875204_420986767204547_6945470671238203201_n.jpg',
    '../images/437899566_1073208650437150_4366853438967539127_n.jpg',
    '../images/437926661_446351264588662_2235867904542656653_n.jpg',,
    '../images/437934920_310175938760807_8659331249838215409_n.jpg',
    '../images/437947950_1850245615492143_355951619933443856_n.jpg',
    '../images/437947955_384996684449192_8582922976059683941_n.jpg',
];

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    star.style.left = `${randomX}px`;
    star.style.top = `${randomY}px`;

    starsContainer.appendChild(star);
}

// Create stars
for (let i = 0; i < 50; i++) {
    createStar();
}

function createImage() {
    const image = new Image();
    const randomX = Math.random() * window.innerWidth;
    const randomY = -50;
    const randomImage = images[Math.floor(Math.random() * images.length)];

    image.onload = function() {
        image.style.position = 'absolute';

        const aspectRatio = getAspectRatio(image.src);
        if (aspectRatio >= 1) {
            image.style.width = '230px';
            image.style.height = 'auto';
        } else {
            image.style.width = 'auto';
            image.style.height = '230px';
        }

        image.style.top = `${randomY}px`;
        image.style.left = `${randomX}px`;

        valentineContainer.appendChild(image);

        const animation = image.animate(
            [
                { transform: `translate(0, ${randomY}px)` },
                { transform: `translate(0, ${window.innerHeight + 50}px)` }
            ],
            {
                duration: Math.random() * 3000 + 3000,
                easing: 'linear',
                iterations: Infinity
            }
        );

        animation.onfinish = () => {
            valentineContainer.removeChild(image);
            createImage();
        };
    };

    image.src = randomImage;
}

// Start creating images
for (let i = 0; i < images.length; i++) {
    createImage();
}

function getAspectRatio(imageSrc) {
    const img = new Image();
    img.src = imageSrc;
    return img.width / img.height;
}

function answerYes() {
    window.location.href = 'nextpage.html';
}

function answerNo() {
    const overlay = document.getElementById('overlay');
    const overlayWidth = overlay.offsetWidth;
    const overlayHeight = overlay.offsetHeight;

    const maxX = window.innerWidth - overlayWidth - 140;
    const maxY = window.innerHeight - overlayHeight - 40;

    const randomX = Math.floor(Math.random() * (maxX + 1));
    const randomY = Math.floor(Math.random() * (maxY + 1));

    overlay.style.left = `${randomX}px`;
    overlay.style.top = `${randomY}px`;
}