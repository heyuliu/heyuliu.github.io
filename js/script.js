function myPlugin({ swiper, extendParams, on }) {
    extendParams({
      debugger: false,
    });

    on('init', () => {
      if (!swiper.params.debugger) return;
      console.log('init');
    });
    on('click', (swiper, e) => {
      if (!swiper.params.debugger) return;
      console.log('click');
    });
    on('tap', (swiper, e) => {
      if (!swiper.params.debugger) return;
      console.log('tap');
    });
    on('doubleTap', (swiper, e) => {
      if (!swiper.params.debugger) return;
      console.log('doubleTap');
    });
    on('sliderMove', (swiper, e) => {
      if (!swiper.params.debugger) return;
      console.log('sliderMove');
    });
    on('slideChange', () => {
      if (!swiper.params.debugger) return;
      console.log(
        'slideChange',
        swiper.previousIndex,
        '->',
        swiper.activeIndex
      );
    });
    on('slideChangeTransitionStart', () => {
      if (!swiper.params.debugger) return;
      console.log('slideChangeTransitionStart');
    });
    on('slideChangeTransitionEnd', () => {
      if (!swiper.params.debugger) return;
      console.log('slideChangeTransitionEnd');
    });
    on('transitionStart', () => {
      if (!swiper.params.debugger) return;
      console.log('transitionStart');
    });
    on('transitionEnd', () => {
      if (!swiper.params.debugger) return;
      console.log('transitionEnd');
    });
    on('fromEdge', () => {
      if (!swiper.params.debugger) return;
      console.log('fromEdge');
    });
    on('reachBeginning', () => {
      if (!swiper.params.debugger) return;
      console.log('reachBeginning');
    });
    on('reachEnd', () => {
      if (!swiper.params.debugger) return;
      console.log('reachEnd');
    });
  }

      // 初始化swiper
      var swiper = new Swiper('.swiper', {
        // Install Plugin To Swiper
          spaceBetween: 0,
          centeredSlides: true,
          autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          },
        modules: [myPlugin],
        speed:2000,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // Enable debugger
        debugger: true,
      });

      // 监听窗口大小变化实现导航栏背景效果显示
      window.addEventListener('scroll', function () {
        let navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
          navbar.classList.add('navbar-scrolled');
        } else {
          navbar.classList.remove('navbar-scrolled');
        }
      });
      //将文字分割并包裹在标签内
      // 获取所有 wave-text 元素
      document.querySelectorAll('.wave-text').forEach(textElement => {
          const text = textElement.textContent;
          textElement.innerHTML = text
              .split('')
              .map((char, index) => `<p data-index="${index}">${char}</p>`)
              .join('');

          const ps = textElement.querySelectorAll('p');
          const range = 64;
          let lastIndex = -1;

          textElement.addEventListener('mousemove', (e) => {
              const targetSpan = e.target;
              if (targetSpan.tagName !== 'P') return;

              const currentIndex = parseInt(targetSpan.dataset.index);

              if (currentIndex !== lastIndex) {
                  ps.forEach(p => p.classList.remove('waving'));
                  for (let i = Math.max(0, currentIndex - range);
                      i <= Math.min(ps.length - 1, currentIndex + range);
                      i++) {
                      const p = ps[i];
                      const distance = Math.abs(currentIndex - i);
                      p.style.animationDelay = `${distance * 0.05}s`;
                      p.classList.add('waving');
                  }
                  lastIndex = currentIndex;
              }
          });

          textElement.addEventListener('mouseleave', () => {
              ps.forEach(p => p.classList.remove('waving'));
              lastIndex = -1;
          });
      });
      
      
      // 获取所有链接
      const links = document.querySelectorAll('.toggleLink');
      // 为每个链接添加点击事件
      links.forEach(link => {
          // 找到当前链接对应的图片容器（假设在同一个父元素 .item 中）
          const box = link.closest('.item').querySelector('.box');

          link.addEventListener('click', (e) => {
              e.preventDefault();

              // 隐藏所有其他图片
              document.querySelectorAll('.box').forEach(otherBox => {
                  if (otherBox !== box) {
                      otherBox.classList.remove('show');
                  }
              });

              // 切换当前图片的显示状态
              box.classList.toggle('show');
          });
      });

      // 点击页面其他地方时隐藏所有图片
      document.addEventListener('click', (e) => {
          const clickedOutside = ![...links].some(link => 
              link.contains(e.target) || 
              link.closest('.item').querySelector('.box').contains(e.target)
          );

          if (clickedOutside) {
              document.querySelectorAll('.box').forEach(box => {
                  box.classList.remove('show');
              });
          }
      });
  

   // 给每个字符包裹一个 span 标签
   document.querySelectorAll('.text-block').forEach(block => {
    const chars = block.textContent.split('');
    block.innerHTML = chars.map(char => `<span>${char}</span>`).join('');
    });

    // 获取所有字符的 span 元素
    const spans = document.querySelectorAll('.text-block span');

    // 监听鼠标移动事件
    document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    spans.forEach(span => {
    // 获取字符的边界矩形
    const rect = span.getBoundingClientRect();
    const spanX = rect.left + rect.width / 2;
    const spanY = rect.top + rect.height / 2;

    // 计算鼠标与字符中心的距离
    const dx = mouseX - spanX;
    const dy = mouseY - spanY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 设置磁力效果的最大影响范围
    const maxDistance = 150;
    if (distance < maxDistance) {
        // 根据距离计算位移强度（越近位移越大）
        const force = (maxDistance - distance) / maxDistance;
        const moveX = (dx / distance) * force * 20; // 最大位移 20px
        const moveY = (dy / distance) * force * 20;

        // 应用位移
        span.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
        // 超出范围时恢复原位
        span.style.transform = 'translate(0, 0)';
    }
    });
    });
    // 鼠标离开容器时恢复所有字符位置
    document.querySelector('.container').addEventListener('mouseleave', () => {
        spans.forEach(span => {
            span.style.transform = 'translate(0, 0)';
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Search Bar Toggle
        const searchIcon = document.querySelector('.search-icon');
        const searchBar = document.querySelector('#searchBar');
        const closeSearch = document.querySelector('.close-search');
    
        if (searchIcon && searchBar && closeSearch) {
            // Show search bar when search icon is clicked
            searchIcon.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                searchBar.style.display = 'block';
            });
    
            // Hide search bar when close icon is clicked
            closeSearch.addEventListener('click', (e) => {
                e.preventDefault();
                searchBar.style.display = 'none';
            });
        } else {
            console.warn('Search bar elements not found. Please check the DOM.');
        }
    
        // Login Section Toggle
        const accountIcon = document.querySelector('.account-icon');
        const loginSection = document.querySelector('#loginSection');
        const closeLogin = document.querySelector('.close-login');
    
        if (accountIcon && loginSection && closeLogin) {
            // Toggle login section when account icon is clicked
            accountIcon.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                loginSection.style.display = loginSection.style.display === 'block' ? 'none' : 'block';
            });
    
            // Close login section when close button is clicked
            closeLogin.addEventListener('click', () => {
                loginSection.style.display = 'none';
            });
        } else {
            console.warn('Login section elements not found. Please check the DOM.');
        }
    
        // Existing scroll event listener for navbar background (if present)
        const navbar = document.querySelector('.navbar');
            if (navbar) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 100) {
                        navbar.classList.add('navbar-scrolled');
                    } else {
                        navbar.classList.remove('navbar-scrolled');
                    }
                });
            }
        });
    