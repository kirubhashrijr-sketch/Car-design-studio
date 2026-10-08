/* =========================================
   AUTONEX CAR DATA
========================================= */

const cars = [

    {
        id: 1,
        brand: "BMW",
        name: "M4 Competition",
        type: "Sports",
        fuel: "Petrol",
        price: 15000000,
        mileage: "10.4 km/l",
        power: "503 HP",
        safety: 92,
        eco: 61,
        resale: 78,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 2,
        brand: "Mercedes-AMG",
        name: "GT 63",
        type: "Luxury",
        fuel: "Petrol",
        price: 28000000,
        mileage: "8.8 km/l",
        power: "577 HP",
        safety: 95,
        eco: 58,
        resale: 82,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 3,
        brand: "Porsche",
        name: "911 Carrera",
        type: "Sports",
        fuel: "Petrol",
        price: 20000000,
        mileage: "11.2 km/l",
        power: "379 HP",
        safety: 93,
        eco: 65,
        resale: 90,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 4,
        brand: "Tesla",
        name: "Model 3",
        type: "EV",
        fuel: "Electric",
        price: 4500000,
        mileage: "Electric",
        power: "394 HP",
        safety: 96,
        eco: 95,
        resale: 74,
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 5,
        brand: "Range Rover",
        name: "Sport",
        type: "SUV",
        fuel: "Diesel",
        price: 14500000,
        mileage: "10 km/l",
        power: "346 HP",
        safety: 94,
        eco: 59,
        resale: 86,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 6,
        brand: "Audi",
        name: "RS e-tron GT",
        type: "EV",
        fuel: "Electric",
        price: 19000000,
        mileage: "Electric",
        power: "637 HP",
        safety: 95,
        eco: 91,
        resale: 77,
        image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 7,
        brand: "Lamborghini",
        name: "Huracán EVO",
        type: "Sports",
        fuel: "Petrol",
        price: 40000000,
        mileage: "7 km/l",
        power: "631 HP",
        safety: 91,
        eco: 45,
        resale: 88,
        image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 8,
        brand: "Volvo",
        name: "XC60 Recharge",
        type: "SUV",
        fuel: "Hybrid",
        price: 7500000,
        mileage: "Hybrid",
        power: "455 HP",
        safety: 98,
        eco: 88,
        resale: 79,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 9,
        brand: "BMW",
        name: "i7",
        type: "Luxury",
        fuel: "Electric",
        price: 21000000,
        mileage: "Electric",
        power: "536 HP",
        safety: 97,
        eco: 93,
        resale: 80,
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=85"
    }

];


/* =========================================
   LOCAL STORAGE
========================================= */

let wishlist =
    JSON.parse(localStorage.getItem("autonexWishlist") || "[]");

let compare =
    JSON.parse(localStorage.getItem("autonexCompare") || "[]");

let user =
    JSON.parse(localStorage.getItem("autonexUser") || "null");

let savedBuild =
    localStorage.getItem("autonexBuild") || "";


/* =========================================
   MONEY FORMAT
========================================= */

function money(value) {

    if (value >= 10000000) {

        return "₹" +
            (value / 10000000)
                .toFixed(2)
                .replace(".00", "") +
            " Cr";

    }

    return "₹" +
        (value / 100000)
            .toFixed(1)
            .replace(".0", "") +
        " L";
}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* =========================================
   CAR RENDER
========================================= */

function renderCars() {

    const grid =
        document.getElementById("carGrid");

    const search =
        document.getElementById("searchInput")
            .value
            .toLowerCase();

    const brand =
        document.getElementById("brandFilter").value;

    const type =
        document.getElementById("typeFilter").value;

    const fuel =
        document.getElementById("fuelFilter").value;

    const price =
        document.getElementById("priceFilter").value;


    const filtered = cars.filter(car => {

        const matchesSearch =
            !search ||
            car.name.toLowerCase().includes(search) ||
            car.brand.toLowerCase().includes(search) ||
            car.type.toLowerCase().includes(search);

        const matchesBrand =
            !brand || car.brand === brand;

        const matchesType =
            !type || car.type === type;

        const matchesFuel =
            !fuel || car.fuel === fuel;

        const matchesPrice =
            !price ||
            car.price <= Number(price) * 100000;

        return (
            matchesSearch &&
            matchesBrand &&
            matchesType &&
            matchesFuel &&
            matchesPrice
        );

    });


    if (!filtered.length) {

        grid.innerHTML = `
            <div class="compare-empty">
                No cars found. Try another filter.
            </div>
        `;

        return;
    }


    grid.innerHTML =
        filtered.map(createCarCard).join("");
}


/* =========================================
   CAR CARD
========================================= */

function createCarCard(car) {

    const liked =
        wishlist.includes(car.id);

    const compared =
        compare.includes(car.id);

    return `

        <article class="car-card">

            <div class="car-img">

                <img
                    src="${car.image}"
                    alt="${car.brand} ${car.name}"
                >

                <div class="car-top">

                    <span class="tag">
                        ${car.type}
                    </span>

                    <button
                        class="heart"
                        onclick="toggleWishlist(${car.id})">

                        ${liked ? "♥" : "♡"}

                    </button>

                </div>

            </div>


            <div class="car-info">

                <div class="car-brand">
                    ${car.brand}
                </div>

                <h3>${car.name}</h3>

                <div class="price">
                    ${money(car.price)}
                </div>

                <div class="spec-row">

                    <span class="spec">
                        ${car.fuel}
                    </span>

                    <span class="spec">
                        ${car.power}
                    </span>

                    <span class="spec">
                        Safety ${car.safety}
                    </span>

                </div>


                <div class="card-actions">

                    <button
                        class="secondary-btn"
                        onclick="showDetails(${car.id})">

                        Details

                    </button>

                    <button
                        class="secondary-btn"
                        onclick="toggleCompare(${car.id})">

                        ${compared ? "✓ Compared" : "Compare"}

                    </button>

                </div>


                <div class="card-actions" style="margin-top:8px">

                    <button
                        class="secondary-btn"
                        onclick="openTestDrive('${car.name}')">

                        Test Drive

                    </button>

                    <button
                        class="secondary-btn"
                        onclick="openDealer()">

                        Dealer

                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================
   FILTER SETUP
========================================= */

function setupFilters() {

    const brandFilter =
        document.getElementById("brandFilter");


    [...new Set(cars.map(car => car.brand))]
        .sort()
        .forEach(brand => {

            brandFilter.innerHTML +=
                `<option>${brand}</option>`;

        });


    [
        "searchInput",
        "brandFilter",
        "typeFilter",
        "fuelFilter",
        "priceFilter"
    ].forEach(id => {

        document
            .getElementById(id)
            .addEventListener("input", renderCars);

        document
            .getElementById(id)
            .addEventListener("change", renderCars);

    });
}


/* =========================================
   WISHLIST
========================================= */

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(x => x !== id);

        showToast("Removed from wishlist");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist ❤️");
    }


    localStorage.setItem(
        "autonexWishlist",
        JSON.stringify(wishlist)
    );

    updateWishlist();

    renderCars();
}


function updateWishlist() {

    document.getElementById("wishCount")
        .textContent = wishlist.length;

    document.getElementById("garageWishlist")
        .textContent =
        `${wishlist.length} car${wishlist.length !== 1 ? "s" : ""} saved`;

    renderWishlist();
}


function renderWishlist() {

    const area =
        document.getElementById("wishlistArea");


    if (!wishlist.length) {

        area.innerHTML = `
            <div class="compare-empty">
                Your wishlist is empty.
            </div>
        `;

        return;
    }


    area.innerHTML =
        wishlist.map(id => {

            const car =
                cars.find(c => c.id === id);

            return `

                <div
                    class="garage-card"
                    style="margin-bottom:10px">

                    <strong>
                        ${car.brand} ${car.name}
                    </strong>

                    <p>
                        ${money(car.price)}
                    </p>

                    <button
                        class="secondary-btn"
                        onclick="showDetails(${car.id})">

                        View Details

                    </button>

                </div>

            `;

        }).join("");
}


/* =========================================
   COMPARE
========================================= */

function toggleCompare(id) {

    if (compare.includes(id)) {

        compare =
            compare.filter(x => x !== id);

        showToast("Removed from comparison");

    } else {

        if (compare.length >= 3) {

            showToast(
                "You can compare up to 3 cars"
            );

            return;
        }

        compare.push(id);

        showToast("Added to comparison");
    }


    localStorage.setItem(
        "autonexCompare",
        JSON.stringify(compare)
    );

    renderCompare();

    renderCars();
}


function renderCompare() {

    const area =
        document.getElementById("compareArea");

    document.getElementById("garageCompare")
        .textContent =
        `${compare.length} cars selected`;


    if (!compare.length) {

        area.innerHTML = `

            <div class="compare-empty">
                Select up to 3 cars to compare.
            </div>

            <div class="compare-empty">
                Price • Power • Safety • Fuel • Eco
            </div>

            <div class="compare-empty">
                Your comparison will appear here.
            </div>

        `;

        return;
    }


    area.innerHTML =
        compare.map(id => {

            const car =
                cars.find(c => c.id === id);

            return `

                <div class="compare-card">

                    <img src="${car.image}">

                    <div class="car-brand">
                        ${car.brand}
                    </div>

                    <h3>${car.name}</h3>

                    <div class="info-row">
                        <span>Price</span>
                        <strong>${money(car.price)}</strong>
                    </div>

                    <div class="info-row">
                        <span>Power</span>
                        <strong>${car.power}</strong>
                    </div>

                    <div class="info-row">
                        <span>Fuel</span>
                        <strong>${car.fuel}</strong>
                    </div>

                    <div class="info-row">
                        <span>Safety</span>
                        <strong>${car.safety}/100</strong>
                    </div>

                    <div class="info-row">
                        <span>Eco</span>
                        <strong>${car.eco}/100</strong>
                    </div>

                    <div class="info-row">
                        <span>Resale</span>
                        <strong>${car.resale}/100</strong>
                    </div>

                    <button
                        class="secondary-btn"
                        style="width:100%;margin-top:12px"
                        onclick="toggleCompare(${car.id})">

                        Remove

                    </button>

                </div>
            `;

        }).join("");
}


function clearCompare() {

    compare = [];

    localStorage.setItem(
        "autonexCompare",
        "[]"
    );

    renderCompare();

    renderCars();

    showToast("Comparison cleared");
}


/* =========================================
   CAR DETAILS
========================================= */

function showDetails(id) {

    const car =
        cars.find(c => c.id === id);

    const content =
        document.getElementById("detailsContent");


    content.innerHTML = `

        <img
            src="${car.image}"
            style="
                width:100%;
                height:260px;
                object-fit:cover;
                border-radius:18px
            "
        >

        <div
            class="kicker"
            style="margin-top:20px">

            ${car.brand}

        </div>

        <h2>${car.name}</h2>

        <p class="modal-sub">
            ${car.type} • ${car.fuel}
        </p>

        <div class="info-row">
            <span>Estimated Price</span>
            <strong>${money(car.price)}</strong>
        </div>

        <div class="info-row">
            <span>Power</span>
            <strong>${car.power}</strong>
        </div>

        <div class="info-row">
            <span>Mileage</span>
            <strong>${car.mileage}</strong>
        </div>

        <div class="info-row">
            <span>Safety Score</span>
            <strong>${car.safety}/100</strong>
        </div>

        <div class="info-row">
            <span>Eco Score</span>
            <strong>${car.eco}/100</strong>
        </div>

        <div class="info-row">
            <span>Resale Score</span>
            <strong>${car.resale}/100</strong>
        </div>

        <div class="modal-actions">

            <button
                class="primary-btn"
                onclick="openTestDrive('${car.name}')">

                Book Test Drive

            </button>

            <button
                class="secondary-btn"
                onclick="openDealer()">

                Find Dealer

            </button>

        </div>

        <div class="modal-actions">

            <button
                class="secondary-btn"
                onclick="openModal('callbackModal')">

                📞 Expert Callback

            </button>

            <button
                class="secondary-btn"
                onclick="printCarReport(${car.id})">

                📑 Report

            </button>

        </div>

    `;


    openModal("detailsModal");
}


/* =========================================
   EMI CALCULATOR
========================================= */

function calculateEMI() {

    const price =
        Number(
            document.getElementById("emiPrice").value
        );

    const down =
        Number(
            document.getElementById("emiDown").value
        );

    const rate =
        Number(
            document.getElementById("emiRate").value
        );

    const years =
        Number(
            document.getElementById("emiYears").value
        );


    const principal =
        Math.max(price - down, 0);

    const monthlyRate =
        rate / 12 / 100;

    const months =
        years * 12;

    let emi = 0;


    if (monthlyRate === 0) {

        emi =
            principal / months;

    } else {

        emi =
            principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);

    }


    document.getElementById("emiResult")
        .innerHTML = `

            <small>Monthly EMI</small>

            <strong>
                ${money(Math.round(emi))}
            </strong>

        `;
}


/* =========================================
   ON ROAD PRICE
========================================= */

function calculateRoadPrice() {

    const price =
        Number(
            document.getElementById("roadPrice").value
        );

    const rto =
        Number(
            document.getElementById("roadRto").value
        );

    const insurance =
        Number(
            document.getElementById("roadInsurance").value
        );

    const other =
        Number(
            document.getElementById("roadOther").value
        );


    const total =
        price +
        price * rto / 100 +
        insurance +
        other;


    document.getElementById("roadResult")
        .innerHTML = `

            <small>Estimated On-Road Price</small>

            <strong>
                ${money(Math.round(total))}
            </strong>

        `;
}


/* =========================================
   FUEL COST
========================================= */

function calculateFuel() {

    const km =
        Number(
            document.getElementById("fuelKm").value
        );

    const mileage =
        Number(
            document.getElementById("fuelMileage").value
        );

    const price =
        Number(
            document.getElementById("fuelPrice").value
        );


    const total =
        mileage > 0
            ? (km / mileage) * price
            : 0;


    document.getElementById("fuelResult")
        .innerHTML = `

            <small>Estimated Monthly Cost</small>

            <strong>
                ${money(Math.round(total))}
            </strong>

        `;
}


/* =========================================
   AI CAR MATCH
========================================= */

function runAI() {

    const budget =
        Number(
            document.getElementById("aiBudget").value
        );

    const priority =
        document.getElementById("aiPriority").value;


    let available =
        cars.filter(car =>
            car.price <= budget * 100000
        );


    if (!available.length) {

        available = cars;

    }


    let best = available[0];

    let bestScore = -1;


    available.forEach(car => {

        let score = 0;


        if (priority === "family") {

            score =
                car.safety * .5 +
                car.resale * .2 +
                car.eco * .1 +
                (car.type === "SUV" ? 20 : 8);

        }


        if (priority === "mileage") {

            score =
                car.eco * .5 +
                car.safety * .2 +
                car.resale * .2;

        }


        if (priority === "performance") {

            score =
                car.safety * .1 +
                car.resale * .1 +
                parseInt(car.power) * .1;

        }


        if (priority === "electric") {

            score =
                (car.fuel === "Electric" ? 60 : 10) +
                car.eco * .4;

        }


        if (priority === "luxury") {

            score =
                (car.type === "Luxury" ? 50 : 15) +
                car.safety * .3 +
                car.resale * .2;

        }


        if (priority === "safety") {

            score =
                car.safety * .7 +
                car.resale * .2 +
                car.eco * .1;

        }


        if (score > bestScore) {

            bestScore = score;
            best = car;

        }

    });


    const match =
        Math.min(
            98,
            Math.max(
                78,
                Math.round(bestScore)
            )
        );


    const result =
        document.getElementById("aiResult");

    result.style.display = "block";


    result.innerHTML = `

        <div
            style="
                display:flex;
                justify-content:space-between;
                gap:20px;
                align-items:center;
                flex-wrap:wrap;
            "
        >

            <div>

                <div class="kicker">
                    YOUR AUTONEX MATCH
                </div>

                <h2>
                    ${best.brand} ${best.name}
                </h2>

                <p style="color:var(--muted)">
                    ${best.type} •
                    ${best.fuel} •
                    ${money(best.price)}
                </p>

            </div>

            <div class="match-score">
                ${match}%
            </div>

        </div>


        <div class="score-bar">

            <div
                class="score-fill"
                style="width:${match}%">
            </div>

        </div>


        <p style="color:var(--muted)">

            Recommended based on your selected
            budget and ${priority} preference.

        </p>


        <div style="display:flex;gap:10px;margin-top:15px">

            <button
                class="primary-btn"
                onclick="toggleWishlist(${best.id})">

                ♡ Save Car

            </button>

            <button
                class="secondary-btn"
                onclick="showDetails(${best.id})">

                View Car

            </button>

        </div>

    `;
}


/* =========================================
   DESIGN STUDIO
========================================= */

let studioCurrentModel =
    "Mercedes-AMG GT";

let studioCurrentColor =
    "Obsidian Black";


function studioModel(model, button) {

    studioCurrentModel = model;


    document
        .querySelectorAll(".choice")
        .forEach(item =>
            item.classList.remove("active")
        );


    button.classList.add("active");


    const image =
        document.getElementById("studioImg");


    if (model === "BMW M4 Competition") {

        image.src =
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=85";

        document.getElementById("buildPrice")
            .textContent = "₹1.50 Cr";
    }


    if (model === "Mercedes-AMG GT") {

        image.src =
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=85";

        document.getElementById("buildPrice")
            .textContent = "₹2.50 Cr";
    }


    if (model === "Porsche 911") {

        image.src =
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85";

        document.getElementById("buildPrice")
            .textContent = "₹2.00 Cr";
    }


    updateBuild();
}


function studioColor(color, button) {

    studioCurrentColor = color;


    document
        .querySelectorAll(".swatch")
        .forEach(item =>
            item.classList.remove("active")
        );


    button.classList.add("active");

    updateBuild();
}


function updateBuild() {

    document.getElementById("studioName")
        .textContent =
        studioCurrentModel;

    document.getElementById("studioColor")
        .textContent =
        studioCurrentColor;

    document.getElementById("buildText")
        .textContent =
        studioCurrentModel +
        " • " +
        studioCurrentColor;
}


function saveBuild() {

    savedBuild =
        studioCurrentModel +
        " • " +
        studioCurrentColor;


    localStorage.setItem(
        "autonexBuild",
        savedBuild
    );


    document.getElementById("garageBuild")
        .textContent =
        savedBuild;


    showToast(
        "Build saved to My Garage 🎨"
    );
}


/* =========================================
   TEST DRIVE
========================================= */

function openTestDrive(carName) {

    openModal("testDriveModal");


    if (carName) {

        const select =
            document.getElementById("tdCar");

        const exists =
            [...select.options]
                .some(option =>
                    option.text === carName
                );


        if (exists) {

            select.value = carName;

        }

    }
}


function bookTestDrive() {

    const name =
        document.getElementById("tdName")
            .value
            .trim();

    const phone =
        document.getElementById("tdPhone")
            .value
            .trim();

    const car =
        document.getElementById("tdCar")
            .value;

    const type =
        document.getElementById("tdType")
            .value;

    const date =
        document.getElementById("tdDate")
            .value;

    const time =
        document.getElementById("tdTime")
            .value;


    if (!name || !phone || !date) {

        showToast(
            "Please complete all required fields"
        );

        return;
    }


    const booking =
        `${car} • ${type} • ${date} • ${time}`;


    localStorage.setItem(
        "autonexTestDrive",
        booking
    );


    document.getElementById("garageTestDrive")
        .textContent =
        booking;


    closeModal("testDriveModal");

    showToast(
        "Test drive request submitted 📅"
    );
}


/* =========================================
   DEALER
========================================= */

function openDealer() {

    openModal("dealerModal");

}


/* =========================================
   CALLBACK
========================================= */

function requestCallback() {

    const name =
        document.getElementById("callbackName")
            .value
            .trim();

    const phone =
        document.getElementById("callbackPhone")
            .value
            .trim();


    if (!name || !phone) {

        showToast(
            "Please enter your details"
        );

        return;
    }


    closeModal("callbackModal");

    showToast(
        "Callback request submitted 📞"
    );
}


/* =========================================
   LOGIN
========================================= */

function loginUser() {

    const name =
        document.getElementById("loginName")
            .value
            .trim();

    const phone =
        document.getElementById("loginPhone")
            .value
            .trim();

    const email =
        document.getElementById("loginEmail")
            .value
            .trim();

    const error =
        document.getElementById("loginError");


    if (!name) {

        error.textContent =
            "Please enter your name.";

        return;
    }


    const validPhone =
        /^[6-9][0-9]{9}$/.test(phone);

    const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);


    if (!validPhone && !validEmail) {

        error.textContent =
            "Enter a valid phone number or email.";

        return;
    }


    user = {
        name: name,
        phone: validPhone ? phone : "",
        email: validEmail ? email : ""
    };


    localStorage.setItem(
        "autonexUser",
        JSON.stringify(user)
    );


    closeModal("loginModal");

    updateProfile();

    showToast(
        `Welcome to AUTONEX, ${name.split(" ")[0]}!`
    );
}


function updateProfile() {

    const button =
        document.getElementById("profileBtn");


    if (user) {

        button.textContent =
            "HI, " +
            user.name
                .split(" ")[0]
                .toUpperCase();

        button.onclick =
            logoutUser;

    } else {

        button.textContent =
            "SIGN IN";

        button.onclick =
            () => openModal("loginModal");

    }
}


function logoutUser() {

    if (confirm("Logout from AUTONEX?")) {

        localStorage.removeItem(
            "autonexUser"
        );

        user = null;

        updateProfile();

        showToast("Logged out");

    }
}


/* =========================================
   MODALS
========================================= */

function openModal(id) {

    document
        .getElementById(id)
        .classList.add("active");
}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("active");
}


document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            function(event) {

                if (event.target === modal) {

                    modal.classList.remove(
                        "active"
                    );

                }

            }
        );

    });


/* =========================================
   DARK MODE
========================================= */

const savedTheme =
    localStorage.getItem("autonexTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    document.getElementById("themeBtn")
        .textContent = "☀";
}


document
    .getElementById("themeBtn")
    .addEventListener("click", () => {

        document.body
            .classList
            .toggle("dark");


        const dark =
            document.body
                .classList
                .contains("dark");


        localStorage.setItem(
            "autonexTheme",
            dark ? "dark" : "light"
        );


        document.getElementById("themeBtn")
            .textContent =
            dark ? "☀" : "☾";

    });


/* =========================================
   REPORT
========================================= */

function printReport() {

    window.print();

}


function printCarReport(id) {

    const car =
        cars.find(c => c.id === id);


    const report = `

AUTONEX CAR REPORT

${car.brand} ${car.name}

Price: ${money(car.price)}
Fuel: ${car.fuel}
Power: ${car.power}
Mileage: ${car.mileage}
Safety Score: ${car.safety}/100
Eco Score: ${car.eco}/100
Resale Score: ${car.resale}/100

Generated by AUTONEX.

    `;


    const win =
        window.open("", "_blank");


    win.document.write(`

        <pre style="
            font-family:Arial;
            padding:40px;
            font-size:16px;
            white-space:pre-wrap;
        ">
${report}
        </pre>

    `);


    win.print();
}


/* =========================================
   DAMAGE DETECTOR DEMO
========================================= */

const damageFile =
    document.getElementById("damageFile");


if (damageFile) {

    damageFile.addEventListener(
        "change",
        function() {

            const file =
                this.files[0];

            if (!file) return;


            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    document
                        .getElementById(
                            "damagePreview"
                        )
                        .innerHTML = `

                            <img
                                src="${event.target.result}"
                                alt="Uploaded car"
                            >

                        `;
                };


            reader.readAsDataURL(file);

        }
    );

}


function analyzeDamage() {

    const file =
        document.getElementById("damageFile")
            .files[0];


    if (!file) {

        showToast(
            "Please upload a car image"
        );

        return;
    }


    document.getElementById("damageResult")
        .innerHTML = `

            <div class="result">

                <strong>
                    Demo Inspection
                </strong>

                <p
                    style="
                        color:var(--muted);
                        font-size:12px;
                        margin-top:8px;
                    "
                >

                    Image received successfully.
                    A production version can connect
                    this module to a computer-vision
                    damage detection model.

                </p>

                <p class="good">
                    ✓ Image ready for inspection
                </p>

            </div>

        `;
}


/* =========================================
   INITIALIZE
========================================= */

setupFilters();

renderCars();

updateWishlist();

renderCompare();

updateProfile();

calculateEMI();

calculateRoadPrice();

calculateFuel();


if (savedBuild) {

    document.getElementById("garageBuild")
        .textContent =
        savedBuild;

}


const savedTestDrive =
    localStorage.getItem(
        "autonexTestDrive"
    );


if (savedTestDrive) {

    document.getElementById("garageTestDrive")
        .textContent =
        savedTestDrive;

}