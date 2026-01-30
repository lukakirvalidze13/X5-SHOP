// ფორმების გადართვა
function toggleForms() {
    const login = document.getElementById('loginForm');
    const register = document.getElementById('registerForm');
    const title = document.getElementById('auth-title');
    
    if (login.style.display !== 'none') {
        login.style.display = 'none';
        register.style.display = 'block';
        title.innerText = "რეგისტრაცია";
    } else {
        login.style.display = 'block';
        register.style.display = 'none';
        title.innerText = "ავტორიზაცია";
    }
}

// პაროლის სიმძლავრის შემოწმება (Requirement #5)
document.getElementById('regPassword').addEventListener('input', function(e) {
    const val = e.target.value;
    const meter = document.getElementById('passwordStrength');
    
    const hasLower = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasNumbers = /\d/.test(val);
    
    if (val === "") {
        meter.innerHTML = "პაროლის სიმძლავრე: ---";
    } else if (hasLower && hasUpper && hasNumbers) {
        meter.className = "strength-meter strong";
        meter.innerText = "სიმძლავრე: ძლიერი";
    } else if (hasNumbers && (hasLower || hasUpper)) {
        meter.className = "strength-meter medium";
        meter.innerText = "სიმძლავრე: საშუალო";
    } else {
        meter.className = "strength-meter weak";
        meter.innerText = "სიმძლავრე: სუსტი";
    }
});

// რეგისტრაციის ვალიდაცია და შედეგი (Requirement #4 & #6)
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirmPassword').value;

    // Email ვალიდაცია (Requirement #4)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("შეცდომა: ელ. ფოსტა უნდა შეიცავდეს @-ს და წერტილის შემდეგ მინიმუმ 2 სიმბოლოს!");
        return;
    }

    if (pass !== confirm) {
        alert("პაროლები არ ემთხვევა!");
        return;
    }


    const data = {
        "სახელი": document.getElementById('regFirstname').value,
        "გვარი": document.getElementById('regLastname').value,
        "ელ. ფოსტა": email,
        "მომხმარებელი": document.getElementById('regUsername').value,
        "ქვეყანა": document.getElementById('regCountry').value,
        "ქალაქი": document.getElementById('regCity').value,
        "მობილური": document.getElementById('regPhone').value,
        "თარიღი": document.getElementById('regDate').value
    };

    displaySuccess("თქვენ წარმატებით გაიარეთ რეგისტრაცია", data);
});

// ავტორიზაციის შედეგი
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    displaySuccess("თქვენ წარმატებით გაიარეთ ავტორიზაცია", {"მომხმარებელი": email});
});

function displaySuccess(message, data) {
    // ვქმნით Neverlose-ის სტილის შედეგის გვერდს
    let rows = "";
    for (let key in data) {
        rows += `
            <div style="display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 13px;">
                <span style="color: #4a4a4f; font-weight: bold; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">${key}</span>
                <span style="color: #eee; font-family: 'Consolas', monospace;">${data[key]}</span>
            </div>
        `;
    }

    const successHTML = `
        <div class="bg-glow"></div>
        <div class="scanline"></div>
        <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; width: 100vw; background: #050505;">
            <div class="nl-window" style="width: 600px; height: auto; padding: 40px; flex-direction: column; align-items: center; border-radius: 4px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div class="nl-logo" style="margin-bottom: 10px;">BMW<span>X</span></div>
                    <h2 style="font-size: 20px; letter-spacing: 1px; color: #fff; margin: 0;">${message}</h2>
                    <p style="color: #00ff88; font-size: 10px; font-family: monospace; margin-top: 10px;">● ACCOUNT_CREATED_SUCCESSFULLY</p>
                </div>

                <div style="width: 100%; background: #08080a; border: 1px solid #1c1c1f; border-radius: 2px; margin-bottom: 30px;">
                    ${rows}
                </div>

                <button onclick="location.reload()" class="nl-btn" style="width: auto; padding: 12px 40px;">
                    სისტემიდან გამოსვლა
                </button>
            </div>
        </div>
    `;

    // მთლიანი Body-ს ჩანაცვლება ახალი ვიზუალით
    document.body.innerHTML = successHTML;
}