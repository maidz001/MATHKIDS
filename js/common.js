class MathLogic {

        // Hàm tạo đáp án nhiễu

        static getOptions(correct, maxVal) {

            let opts = new Set([correct]);

        while(opts.size < 4) {

                // Random số trong khoảng hợp lý

                let r = Math.floor(Math.random() * (maxVal + 5)) + 1;

                if(r !== correct && r > 0) opts.add(r);

            }

            return Array.from(opts).sort(() => Math.random() - 0.5);

        }

 

        static generate(type) {

            // --- MẦM NON: ĐẾM ---

            if (type === 'COUNTING') {

                const count = Math.floor(Math.random() * 10) + 1;

                let html = '';

                for(let i=0; i<count; i++) html += '<span class="star-icon">★</span>';

                return { html, answer: count, options: this.getOptions(count, 12) };

            }

            

            // --- LỚP 1: CỘNG ---

            else if (type === 'ADDITION') {

                const a = Math.floor(Math.random() * 10);

                const b = Math.floor(Math.random() * 10);

                return { html: `${a} + ${b} = ?`, answer: a + b, options: this.getOptions(a + b, 20) };

            }

 

            // --- LỚP 1: TRỪ ---

            else if (type === 'SUBTRACTION') {

                const a = Math.floor(Math.random() * 10) + 5; // Số bị trừ lớn chút

                const b = Math.floor(Math.random() * 5);          // Số trừ nhỏ hơn

                return { html: `${a} - ${b} = ?`, answer: a - b, options: this.getOptions(a - b, 15) };

            }

 

            // --- LỚP 2-5: NHÂN (Demo) ---

            else if (type === 'MULTIPLICATION') {

                const a = Math.floor(Math.random() * 5) + 1;

                const b = Math.floor(Math.random() * 9) + 1;

                return { html: `${a} × ${b} = ?`, answer: a * b, options: this.getOptions(a * b, 50) };

            }

        }

}

 

class GameRunner {

    constructor(gameType) {

            this.type = gameType;

            this.score = 0;

            this.qCount = 0;

            this.total = 5; // 5 câu mỗi vòng

            this.canClick = true;

 

            this.qArea = document.getElementById('question-area');

            this.optArea = document.getElementById('options-area');

            this.counter = document.getElementById('q-counter');

 

        this.nextQuestion();

        }

 

        nextQuestion() {

            if (this.qCount >= this.total) {

                alert(`Giỏi quá! Bạn đúng ${this.score}/${this.total} câu.`);

            window.location.href = '../index.html'; // Về trang chủ

                return;

            }

 

            this.qCount++;

        if(this.counter) this.counter.innerText = this.qCount;

            this.canClick = true;

 

            const data = MathLogic.generate(this.type);

        this.currentAnswer = data.answer;

 

        this.qArea.innerHTML = data.html;

        this.optArea.innerHTML = '';

 

            data.options.forEach(num => {

                const btn = document.createElement('button');

            btn.className = 'option-btn';

            btn.innerText = num;

            btn.onclick = (e) => this.check(num, e.target);

                this.optArea.appendChild(btn);

            });

        }

 

        check(val, btn) {

            if (!this.canClick) return;

            this.canClick = false;

 

            if (val === this.currentAnswer) {

            btn.classList.add('correct');

            this.score++;

            } else {

            btn.classList.add('wrong');

            }

            setTimeout(() => this.nextQuestion(), 1000);

        }

}