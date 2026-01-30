// main.js

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const siteNameInput = document.getElementById('siteName');
    const userIDInput = document.getElementById('userID');
    const resultContainer = document.getElementById('resultContainer');
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');
    const toast = document.getElementById('toast');

    // Password Configuration
    const LENGTH = 12;
    const CHARS = {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
        special: '!@#$%^&*'
    };

    function generatePassword() {
        // UI Feedback logic could be here
        
        let password = '';
        
        // Guarantee at least one of each type
        password += getRandomChar(CHARS.upper);
        password += getRandomChar(CHARS.lower);
        password += getRandomChar(CHARS.number);
        password += getRandomChar(CHARS.special);

        // Fill the rest randomly
        const allChars = CHARS.upper + CHARS.lower + CHARS.number + CHARS.special;
        for (let i = password.length; i < LENGTH; i++) {
            password += getRandomChar(allChars);
        }

        // Shuffle the password
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        // Display Result
        passwordOutput.textContent = password;
        resultContainer.classList.remove('hidden');
    }

    function getRandomChar(str) {
        return str.charAt(Math.floor(Math.random() * str.length));
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    async function copyToClipboard() {
        const site = siteNameInput.value.trim() || '(사이트 이름 없음)';
        const id = userIDInput.value.trim() || '(아이디 없음)';
        const password = passwordOutput.textContent;

        const textToCopy = `사이트: ${site}\n아이디: ${id}\n비밀번호: ${password}`;

        try {
            await navigator.clipboard.writeText(textToCopy);
            showToast('전체 내용이 복사되었습니다!');
        } catch (err) {
            console.error('Failed to copy:', err);
            showToast('복사에 실패했습니다.');
        }
    }

    // Event Listeners
    generateBtn.addEventListener('click', generatePassword);
    
    // Allow 'Enter' key to generate
    siteNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            userIDInput.focus(); // Move to next field
        }
    });

    userIDInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generatePassword();
    });

    copyBtn.addEventListener('click', copyToClipboard);
});
