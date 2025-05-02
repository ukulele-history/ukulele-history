/**
 * main.js - 尤克里里历史网站主JavaScript文件
 * 包含所有页面共享的功能和交互
 */

document.addEventListener('DOMContentLoaded', function() {
    // 移动菜单功能
    initMobileMenu();
    
    // 滚动显示元素
    initScrollReveal();
    
    // 平滑滚动锚点链接
    initSmoothScroll();
    
    // 搜索功能
    initSearch();

    // 图像懒加载
    initLazyLoading();
});

/**
 * 初始化移动设备菜单
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            
            // 切换菜单图标
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // 点击导航链接后关闭菜单
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 767) {
                    mainNav.classList.remove('show');
                    if (menuToggle.querySelector('i')) {
                        menuToggle.querySelector('i').classList.remove('fa-times');
                        menuToggle.querySelector('i').classList.add('fa-bars');
                    }
                }
            });
        });
    }
}

/**
 * 初始化滚动显示元素
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        function checkReveal() {
            for (let i = 0; i < revealElements.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = revealElements[i].getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    revealElements[i].classList.add('active');
                }
            }
        }
        
        window.addEventListener('scroll', checkReveal);
        // 初始检查，以防元素已在视口中
        checkReveal();
    }
}

/**
 * 初始化平滑滚动
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 平滑滚动到目标元素
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // 更新URL
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * 初始化搜索功能
 */
function initSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const query = searchInput.value.trim();
            if (query.length > 0) {
                // 在实际应用中，这里会将用户重定向到搜索结果页面
                // 对于这个简单版本，我们只是提示搜索功能
                alert('搜索功能将在未来版本中实现。您搜索的是: ' + query);
                
                // 将来的实现可以是:
                // window.location.href = 'search-results.html?q=' + encodeURIComponent(query);
            }
        });
    }
}

/**
 * 初始化图像懒加载
 */
function initLazyLoading() {
    // 检查浏览器是否支持IntersectionObserver
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 如果不支持，则使用简单的滚动监听方式
        let lazyloadThrottleTimeout;
        
        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }
            
            lazyloadThrottleTimeout = setTimeout(function() {
                const lazyImages = document.querySelectorAll('[data-src]');
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length == 0) {
                    document.removeEventListener('scroll', lazyload);
                    window.removeEventListener('resize', lazyload);
                    window.removeEventListener('orientationChange', lazyload);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyload);
        window.addEventListener('resize', lazyload);
        window.addEventListener('orientationChange', lazyload);
    }
}

/**
 * 添加返回顶部按钮
 */
window.addEventListener('scroll', function() {
    // 检查是否已经创建了按钮
    let backToTopBtn = document.getElementById('backToTopBtn');
    
    // 如果滚动超过300px且按钮不存在，则创建按钮
    if (window.pageYOffset > 300) {
        if (!backToTopBtn) {
            backToTopBtn = document.createElement('button');
            backToTopBtn.id = 'backToTopBtn';
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTopBtn.style.position = 'fixed';
            backToTopBtn.style.bottom = '20px';
            backToTopBtn.style.right = '20px';
            backToTopBtn.style.zIndex = '99';
            backToTopBtn.style.border = 'none';
            backToTopBtn.style.outline = 'none';
            backToTopBtn.style.backgroundColor = 'var(--primary-color)';
            backToTopBtn.style.color = 'white';
            backToTopBtn.style.cursor = 'pointer';
            backToTopBtn.style.padding = '15px';
            backToTopBtn.style.borderRadius = '50%';
            backToTopBtn.style.fontSize = '16px';
            backToTopBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            backToTopBtn.style.transition = 'all 0.3s ease';
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            document.body.appendChild(backToTopBtn);
        }
        
        backToTopBtn.style.display = 'block';
    } else if (backToTopBtn) {
        backToTopBtn.style.display = 'none';
    }
});
