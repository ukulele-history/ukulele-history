/**
 * timeline.js - 尤克里里历史时间线特定功能
 * 为时间线页面提供交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化时间线动画
    initTimelineAnimation();
    
    // 初始化时间线导航
    initTimelineNavigation();
    
    // 初始化时间线图片缩放功能
    initTimelineImageZoom();
});

/**
 * 初始化时间线元素的动画效果
 * 根据元素进入视口时触发动画
 */
function initTimelineAnimation() {
    // 检查浏览器是否支持IntersectionObserver
    if ('IntersectionObserver' in window) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const content = item.querySelector('.timeline-content');
                    
                    // 为左侧和右侧项目添加不同的动画类
                    if (item.classList.contains('timeline-item-left')) {
                        content.classList.add('slide-in-right');
                    } else {
                        content.classList.add('slide-in-left');
                    }
                    
                    // 动画完成后移除观察
                    observer.unobserve(item);
                }
            });
        }, {
            threshold: 0.2 // 当20%的元素可见时触发动画
        });
        
        // 开始观察所有时间线项目
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    } else {
        // 对于不支持IntersectionObserver的浏览器，默认显示所有项目
        const timelineContents = document.querySelectorAll('.timeline-content');
        timelineContents.forEach(content => {
            const item = content.closest('.timeline-item');
            if (item.classList.contains('timeline-item-left')) {
                content.classList.add('slide-in-right');
            } else {
                content.classList.add('slide-in-left');
            }
        });
    }
}

/**
 * 初始化时间线导航功能
 * 允许用户快速跳转到特定时期
 */
function initTimelineNavigation() {
    const navigationButtons = document.querySelectorAll('a[href^="#"]');
    
    navigationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 计算偏移量，考虑固定标题的高度
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 高亮显示目标部分
                highlightSection(targetId);
            }
        });
    });
    
    // 监听滚动事件，自动更新活动导航项
    window.addEventListener('scroll', updateActiveNavigationItem);
}

/**
 * 高亮显示当前活动的时间线部分
 */
function highlightSection(sectionId) {
    // 移除所有导航按钮的高亮
    const navigationButtons = document.querySelectorAll('a[href^="#"]');
    navigationButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 高亮当前部分的导航按钮
    const activeButton = document.querySelector(`a[href="${sectionId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // 为活动部分添加视觉高亮
    const sections = document.querySelectorAll('h2[id]');
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    
    const activeSection = document.querySelector(sectionId);
    if (activeSection) {
        activeSection.classList.add('active-section');
    }
}

/**
 * 根据滚动位置更新活动导航项
 */
function updateActiveNavigationItem() {
    const sections = document.querySelectorAll('h2[id]');
    const navigationItems = document.querySelectorAll('a[href^="#"]');
    
    // 获取当前滚动位置，考虑标题高度
    const scrollPosition = window.scrollY + document.querySelector('.header').offsetHeight + 50;
    
    // 查找当前视图中的部分
    let currentSection = '';
    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition) {
            currentSection = `#${section.id}`;
        }
    });
    
    // 更新导航高亮
    navigationItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentSection) {
            item.classList.add('active');
        }
    });
}

/**
 * 初始化时间线图片缩放功能
 * 允许用户点击放大查看时间线中的图片
 */
function initTimelineImageZoom() {
    // 获取时间线中的所有图片
    const timelineImages = document.querySelectorAll('.timeline-content img');
    
    // 为每个图片添加点击事件
    timelineImages.forEach(img => {
        // 添加鼠标悬停样式
        img.style.cursor = 'pointer';
        
        // 点击时创建模态框显示大图
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.classList.add('image-modal');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '1000';
            modal.style.opacity = '0';
            modal.style.transition = 'opacity 0.3s ease';
            
            // 创建大图
            const largeImg = document.createElement('img');
            largeImg.src = this.src;
            largeImg.alt = this.alt;
            largeImg.style.maxWidth = '90%';
            largeImg.style.maxHeight = '90%';
            largeImg.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
            
            // 创建关闭按钮
            const closeButton = document.createElement('span');
            closeButton.textContent = '×';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '20px';
            closeButton.style.right = '30px';
            closeButton.style.color = 'white';
            closeButton.style.fontSize = '40px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.cursor = 'pointer';
            
            // 创建图片说明
            const caption = document.createElement('div');
            caption.textContent = this.alt;
            caption.style.color = 'white';
            caption.style.textAlign = 'center';
            caption.style.padding = '10px';
            caption.style.position = 'absolute';
            caption.style.bottom = '20px';
            caption.style.left = '0';
            caption.style.right = '0';
            
            // 添加元素到模态框
            modal.appendChild(largeImg);
            modal.appendChild(closeButton);
            modal.appendChild(caption);
            document.body.appendChild(modal);
            
            // 显示模态框
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // 点击关闭按钮或模态框背景关闭
            function closeModal() {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
            
            closeButton.addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // ESC键关闭
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });
    });
}

/**
 * 添加年份过滤功能
 */
function initTimelineFilter() {
    const filterForm = document.getElementById('timelineFilter');
    
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const startYear = document.getElementById('startYear').value;
            const endYear = document.getElementById('endYear').value;
            
            // 过滤时间线项目
            filterTimelineItems(startYear, endYear);
        });
    }
}

/**
 * 根据年份范围过滤时间线项目
 */
function filterTimelineItems(startYear, endYear) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const yearElement = item.querySelector('.timeline-date');
        
        if (yearElement) {
            const yearText = yearElement.textContent;
            // 提取年份数字
            const yearMatch = yearText.match(/\d{4}/);
            
            if (yearMatch) {
                const year = parseInt(yearMatch[0]);
                
                // 检查年份是否在范围内
                if ((startYear === '' || year >= parseInt(startYear)) && 
                    (endYear === '' || year <= parseInt(endYear))) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            }
        }
    });
    
    // 更新时间线视觉效果
    updateTimelineVisuals();
}

/**
 * 在过滤后更新时间线视觉效果
 */
function updateTimelineVisuals() {
    const timeline = document.querySelector('.timeline');
    const visibleItems = document.querySelectorAll('.timeline-item[style="display: "]');
    
    // 如果没有可见项目，显示消息
    if (visibleItems.length === 0) {
        let noResultsMessage = document.getElementById('noResultsMessage');
        
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.id = 'noResultsMessage';
            noResultsMessage.textContent = 'No events found for the selected time period.';
            noResultsMessage.style.textAlign = 'center';
            noResultsMessage.style.padding = '30px';
            noResultsMessage.style.color = 'var(--text-color)';
            timeline.appendChild(noResultsMessage);
        }
    } else {
        // 移除无结果消息（如果存在）
        const noResultsMessage = document.getElementById('noResultsMessage');
        if (noResultsMessage) {
            timeline.removeChild(noResultsMessage);
        }
    }
}
