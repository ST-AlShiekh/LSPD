document.addEventListener('DOMContentLoaded', () => {
    const iconData = {
        // الربط الصحيح بناءً على أسماء الملفات التي تظهر في الكود عندك


    const modal = document.getElementById('infoModal');
    const modalContent = modal.querySelector('.modal-content');
    const titleElem = document.getElementById('modalTitle');
    const descElem = document.getElementById('modalDescription');

    document.querySelectorAll('.res-icons img').forEach(img => {
        img.addEventListener('mouseenter', function(e) {
            const fileName = this.src.split('/').pop();
            const data = iconData[fileName];
            if (data) {
                titleElem.innerText = data.title;
                descElem.innerText = data.desc;
                modal.style.display = "block";
            }
        });

        img.addEventListener('mousemove', (e) => {
            let x = e.pageX + 15;
            let y = e.pageY + 15;
            if (x + 260 > window.innerWidth) x = e.pageX - 280;
            modalContent.style.left = x + "px";
            modalContent.style.top = y + "px";
        });

        img.addEventListener('mouseleave', () => {
            modal.style.display = "none";
        });
    });
});



        /* تحديث ألوان الجزيئات (Particles) لتصبح زرقاء */
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60 },
                "color": { "value": "#007bff" }, /* أزرق فاتح للجزيئات */
                "shape": { "type": "circle" },
                "opacity": { "value": 0.2 },
                "size": { "value": 2 },
                "line_linked": { "enable": true, "distance": 150, "color": "#0056b3", "opacity": 0.1, "width": 1 }, /* خطوط زرقاء داكنة */
                "move": { "enable": true, "speed": 1.5 }
            }
        });

        function showPage(pageId) {
            document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
            document.getElementById(pageId).classList.add("active");
            window.scrollTo({top: 0, behavior: 'smooth'});
        }

        const searchInput = document.getElementById('searchInput');
        const resultsBox = document.getElementById('search-results');
        const cards = document.querySelectorAll('.card');

        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            resultsBox.innerHTML = '';
            
            if (query.length < 1) {
                resultsBox.style.display = 'none';
                return;
            }

            let matches = [];
            cards.forEach(card => {
                const text = card.innerText;
                if (text.toLowerCase().includes(query)) {
                    const lines = text.split(/[،\n.-]/);
                    lines.forEach(l => {
                        if (l.toLowerCase().includes(query) && l.trim().length > 3) {
                            matches.push(l.trim());
                        }
                    });
                }
            });

            matches = [...new Set(matches)].slice(0, 8);

            if (matches.length > 0) {
                resultsBox.style.display = 'block';
                matches.forEach(match => {
                    const div = document.createElement('div');
                    div.className = 'result-item';
                    /* تحديث لون الكلمة المميزة في البحث للأزرق */
                    div.innerHTML = match.replace(new RegExp(query, 'gi'), m => `<span style="color:#3399ff; font-weight:bold;">${m}</span>`);
                    div.onclick = () => {
                        searchInput.value = match;
                        resultsBox.style.display = 'none';
                        filterCards(match.toLowerCase());
                    };
                    resultsBox.appendChild(div);
                });
            } else {
                resultsBox.style.display = 'none';
            }
        });

        function filterCards(query) {
            cards.forEach(card => {
                card.style.display = card.innerText.toLowerCase().includes(query) ? "flex" : "none";
            });
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-wrapper')) resultsBox.style.display = 'none';
        });
