// main.js

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const siteNameInput = document.getElementById('siteName');
    const resultContainer = document.getElementById('resultContainer');
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');
    const shareBtn = document.getElementById('shareBtn');
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
        const site = siteNameInput.value.trim();
        
        // Ensure UI Feedback even if empty, but prefer input
        if (!site) {
            // Optional: Shake input or warn, but let's just generate anyway for UX flow
        }

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
        const text = passwordOutput.textContent;
        try {
            await navigator.clipboard.writeText(text);
            showToast('비밀번호가 복사되었습니다!');
        } catch (err) {
            console.error('Failed to copy:', err);
            showToast('복사에 실패했습니다.');
        }
    }

    async function shareData() {
        const site = siteNameInput.value.trim() || '웹사이트';
        const password = passwordOutput.textContent;
        
        const shareData = {
            title: '새로운 비밀번호 생성',
            text: `[${site}] 비밀번호: ${password}`,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                // The native share sheet will open. 
                // User can select Google Keep or Samsung Notes here.
            } else {
                // Fallback for desktop browsers without share support
                copyToClipboard();
                showToast('공유 기능을 지원하지 않는 브라우저입니다. 복사되었습니다.');
            }
        } catch (err) {
            // User cancelled share or error
            console.log('Share skipped', err);
        }
    }

    // Event Listeners
    generateBtn.addEventListener('click', generatePassword);
    
    // Allow 'Enter' key to generate
    siteNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generatePassword();
    });

    copyBtn.addEventListener('click', copyToClipboard);
    shareBtn.addEventListener('click', shareData);
});
