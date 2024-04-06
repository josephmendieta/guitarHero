var score = 0;
        var scoreZone = document.querySelector('.score-zone');
        var isPaused = true;
        var competitorInterval;
        var competitors = [];

        // Posicionar las columnas
        var columns = document.querySelectorAll('.column');
        var left = 0;
        columns.forEach(function (column) {
            column.style.left = left + '%';
            left += 25; // Incrementamos el valor izquierdo para la próxima columna
        });

        // Crear las cuerdas de la guitarra
        var stringsContainer = document.querySelector('.strings');
        for (var i = 1; i <= 6; i++) {
            var string = document.createElement('div');
            string.className = 'string';
            string.style.top = (i * 70) + 'px';
            stringsContainer.appendChild(string);
        }

        function createCompetitor() {
            if (!isPaused) {
                var competitorDiv = document.createElement("div");
                competitorDiv.setAttribute("class", "circle");
                var positions = ["6%", "31%", "56%", "81%"];
                var initialLeft = positions[Math.floor(Math.random() * positions.length)];

                competitorDiv.style.left = initialLeft;
                document.querySelector('.game-container').appendChild(competitorDiv);
                competitors.push(competitorDiv);
            }
        }

        function checkCollision(columnId) {
            if (!isPaused) {
                var circles = document.querySelectorAll(".circle");
                var scoreZoneRect = scoreZone.getBoundingClientRect();
                var columnRect = document.getElementById(columnId).getBoundingClientRect();

                circles.forEach(function (circle) {
                    var circleRect = circle.getBoundingClientRect();
                    if (circleRect.bottom >= scoreZoneRect.top && circleRect.top <= scoreZoneRect.bottom &&
                        circleRect.left >= columnRect.left && circleRect.right <= columnRect.right) {
                        increaseScore();
                        circle.remove();
                    }
                });
            }
        }

        function increaseScore() {
            score++;
            document.getElementById('score').textContent = "Puntos: " + score;
        }

        function togglePause() {
            isPaused = !isPaused;
            var pauseBtn = document.getElementById('pause-btn');
            if (isPaused) {
                pauseBtn.textContent = 'Despausar';
                competitors.forEach(function (competitor) {
                    competitor.classList.add('paused');
                });
                // Pausar música
                document.getElementById('bgMusic').pause();
            } else {
                pauseBtn.textContent = 'Pausar';
                competitors.forEach(function (competitor) {
                    competitor.classList.remove('paused');
                });
                // Despausar música
                document.getElementById('bgMusic').play();
            }
        }

        function startGame() {
            isPaused = false;
            document.getElementById('pause-btn').removeAttribute('disabled');
            document.getElementById('restart-btn').removeAttribute('disabled');
            document.getElementById('start-btn').setAttribute('disabled', 'disabled');
            // Iniciar música
            document.getElementById('bgMusic').play();
            competitorInterval = setInterval(createCompetitor, 1000);
        }

        function restartGame() {
            score = 0;
            document.getElementById('score').textContent = "Puntos: 0";
            competitors.forEach(function (competitor) {
                competitor.remove();
            });
            competitors = [];
        }

        document.addEventListener("keydown", function (evt) {
            if (!isPaused) {
                switch (evt.key) {
                    case "z":
                        checkCollision("column1");
                        break;
                    case "x":
                        checkCollision("column2");
                        break;
                    case "c":
                        checkCollision("column3");
                        break;
                    case "v":
                        checkCollision("column4");
                        break;
                    default:
                        break;
                }
            }
        });