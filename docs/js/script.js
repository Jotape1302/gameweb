document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('quizForm');
    const quizCard = document.getElementById('quizCard');
    const resultCard = document.getElementById('resultCard');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const messageDisplay = document.getElementById('messageDisplay');
    const restartContainer = document.getElementById('restartContainer');

    const answers = {
        q1: 'stan_lee',
        q2: ['ross', 'phoebe', 'rachel'],
        q3: 'thriller',
        q4: '1977'
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        clearErrors();

        if (!validateForm()) {
            return;
        }

        const score = calculateScore();
        showResults(score);
    });

    function validateForm() {
        let isValid = true;

        const q1Checked = document.querySelector('input[name="q1"]:checked');
        if (!q1Checked) {
            showError('feedback-q1');
            isValid = false;
        }

        const q2Checked = document.querySelectorAll('input[name="q2"]:checked');
        if (q2Checked.length === 0) {
            showError('feedback-q2');
            isValid = false;
        }

        const q3Value = document.getElementById('q3').value.trim();
        if (q3Value === '') {
            showError('feedback-q3');
            document.getElementById('q3').classList.add('is-invalid');
            isValid = false;
        }

        const q4Value = document.getElementById('q4').value;
        if (q4Value === '') {
            showError('feedback-q4');
            document.getElementById('q4').classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    function showError(id) {
        document.getElementById(id).classList.remove('d-none');
    }

    function clearErrors() {
        document.querySelectorAll('[id^="feedback-"]').forEach(el => el.classList.add('d-none'));
        document.querySelectorAll('.form-control, .form-select').forEach(el => el.classList.remove('is-invalid'));
    }

    function calculateScore() {
        let points = 0;
        const formData = new FormData(form);

        if (formData.get('q1') === answers.q1) points++;

        const userQ2 = formData.getAll('q2');
        const userSorted = userQ2.sort().toString();
        const correctSorted = answers.q2.sort().toString();
        if (userSorted === correctSorted) points++;

        const userQ3 = formData.get('q3').trim().toLowerCase();
        if (userQ3 === answers.q3) points++;

        if (formData.get('q4') === answers.q4) points++;

        return points;
    }

    function showResults(score) {
        quizCard.classList.add('d-none');
        resultCard.classList.remove('d-none');

        scoreDisplay.textContent = `${score} / 4`;

        let msg = '';
        let colorClass = '';
        if (score === 4) {
            msg = 'Perfeito! Você é um mestre da cultura pop!';
            colorClass = 'text-success';
        } else if (score >= 2) {
            msg = 'Muito bom! Você conhece bastante.';
            colorClass = 'text-primary';
        } else {
            msg = 'Que pena! Tente assistir mais filmes e séries.';
            colorClass = 'text-danger';
        }

        messageDisplay.textContent = msg;
        scoreDisplay.className = `display-4 fw-bold mb-3 ${colorClass}`;

        const correctHTML = `
            <h4 class="text-secondary mb-3">Respostas corretas:</h4>

            <p><strong>1)</strong> Stan Lee</p>
            <p><strong>2)</strong> Ross Geller, Phoebe Buffay, Rachel Green</p>
            <p><strong>3)</strong> Thriller</p>
            <p><strong>4)</strong> 1977</p>
        `;

        document.getElementById('correctAnswers').innerHTML = correctHTML;

        restartContainer.innerHTML = '';
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-secondary btn-lg';
        btn.textContent = 'Jogar Novamente';
        btn.onclick = resetQuiz;
        restartContainer.appendChild(btn);
    }

    function resetQuiz() {
        form.reset();
        clearErrors();
        resultCard.classList.add('d-none');
        quizCard.classList.remove('d-none');
        window.scrollTo(0, 0);
    }

});