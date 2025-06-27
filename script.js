
    document.addEventListener("DOMContentLoaded", () => {
      const logos = document.querySelectorAll(".floating-logo");
      const area = document.getElementById("logo-area");

      const logoData = Array.from(logos).map(logo => ({
        el: logo,
        x: Math.random() * (area.clientWidth - 60),
        y: Math.random() * (area.clientHeight - 60),
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
      }));

      function detectCollision(a, b) {
        const rect1 = a.el.getBoundingClientRect();
        const rect2 = b.el.getBoundingClientRect();

        return !(
          rect1.top > rect2.bottom ||
          rect1.bottom < rect2.top ||
          rect1.left > rect2.right ||
          rect1.right < rect2.left
        );
      }

      function createSparkle(x, y) {
        const spark = document.createElement("div");
        spark.className = "sparkle";
        spark.className = "sparkle";
        spark.style.left = x + "px";
        spark.style.top = y + "px";
        area.appendChild(spark);
        setTimeout(() => spark.remove(), 500);
      }

      function animate() {
        logoData.forEach(logo => {
          logo.x += logo.dx;
          logo.y += logo.dy;

          if (logo.x <= 0 || logo.x >= area.clientWidth - 60) logo.dx *= -1;
          if (logo.y <= 0 || logo.y >= area.clientHeight - 60) logo.dy *= -1;

          logo.el.style.transform = `translate(${logo.x}px, ${logo.y}px)`;
        });

        for (let i = 0; i < logoData.length; i++) {
          for (let j = i + 1; j < logoData.length; j++) {
            if (detectCollision(logoData[i], logoData[j])) {
              [logoData[i].dx, logoData[j].dx] = [logoData[j].dx, logoData[i].dx];
              [logoData[i].dy, logoData[j].dy] = [logoData[j].dy, logoData[i].dy];
              const x = (logoData[i].x + logoData[j].x) / 2;
              const y = (logoData[i].y + logoData[j].y) / 2;
              createSparkle(x, y);
            }
          }
        }

        requestAnimationFrame(animate);
      }

      animate();
    });
  
    