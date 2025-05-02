/**
 * search.js - 尤克里里历史网站搜索功能
 * 提供网站内搜索功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化搜索表单
    initSearchForm();
});

/**
 * 初始化搜索表单功能
 */
function initSearchForm() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const query = searchInput.value.trim();
            if (query.length > 0) {
                // 在V1版本中，简单显示一个搜索结果模态框
                showSearchResults(query);
            }
        });
    }
}

/**
 * 显示搜索结果模态框
 * 在V1版本中，这只是一个模拟，显示一个简单的模态框
 * @param {string} query - 搜索查询
 */
function showSearchResults(query) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    // 创建结果容器
    const resultContainer = document.createElement('div');
    resultContainer.style.backgroundColor = 'white';
    resultContainer.style.padding = '30px';
    resultContainer.style.borderRadius = '8px';
    resultContainer.style.maxWidth = '600px';
    resultContainer.style.width = '90%';
    resultContainer.style.maxHeight = '80vh';
    resultContainer.style.overflow = 'auto';
    
    // 添加搜索结果头部
    const header = document.createElement('div');
    header.innerHTML = `
        <h2>Search Results for "${query}"</h2>
        <p>In the full version, this would show actual search results from the site content.</p>
        <p>For now, here are some suggested pages that might match your search:</p>
    `;
    
    // 模拟搜索结果
    const results = document.createElement('div');
    
    // 基于查询构建模拟结果
    let resultHTML = '';
    
    if (query.toLowerCase().includes('hawaii') || query.toLowerCase().includes('origin')) {
        resultHTML += `
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <h3><a href="ukulele-history-origins">Hawaiian Origins of the Ukulele</a></h3>
                <p>Explore how the ukulele originated in Hawaii from Portuguese instruments. Learn about the cultural exchange that created this iconic instrument.</p>
            </div>
        `;
    }
    
    if (query.toLowerCase().includes('timeline') || query.toLowerCase().includes('dates') || query.toLowerCase().includes('year')) {
        resultHTML += `
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <h3><a href="ukulele-history-timeline">Complete Ukulele History Timeline</a></h3>
                <p>Journey through time and discover the fascinating evolution of the ukulele from its Portuguese origins to global phenomenon.</p>
            </div>
        `;
    }
    
    if (query.toLowerCase().includes('fact') || query.toLowerCase().includes('interest')) {
        resultHTML += `
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <h3><a href="ukulele-history-facts">Fascinating Ukulele History Facts</a></h3>
                <p>Discover surprising stories, interesting trivia, and historical tidbits about the beloved ukulele.</p>
            </div>
        `;
    }
    
    if (query.toLowerCase().includes('kid') || query.toLowerCase().includes('worksheet') || query.toLowerCase().includes('teach') || query.toLowerCase().includes('education')) {
        resultHTML += `
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <h3><a href="ukulele-history-resources">Educational Resources</a></h3>
                <p>Free worksheets, lesson plans, and learning materials for teachers, parents, and students of all ages.</p>
            </div>
        `;
    }
    
    if (query.toLowerCase().includes('video')) {
        resultHTML += `
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <h3><a href="ukulele-history-videos">Ukulele History Videos</a></h3>
                <p>Watch informative videos about the history and evolution of the ukulele.</p>
            </div>
        `;
    }
    
    if (query.toLowerCase().includes('brand') || query.toLowerCase().includes('harmony')) {
        resultHTML += `
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <h3><a href="harmony-ukulele-history">Famous Ukulele Brands History</a></h3>
                <p>Learn about the history of influential ukulele manufacturers like Harmony that shaped the instrument's evolution.</p>
            </div>
        `;
    }
    
    // 如果没有匹配，显示通用结果
    if (resultHTML === '') {
        resultHTML = `
            <div style="margin-bottom: 20px;">
                <p>No specific matches found. You might be interested in these pages:</p>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="ukulele-history-timeline">Ukulele History Timeline</a></li>
                    <li><a href="ukulele-history-facts">Interesting Facts</a></li>
                </ul>
            </div>
        `;
    }
    
    results.innerHTML = resultHTML;
    
    // 添加关闭按钮
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = 'var(--primary-color, #2b7a78)';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginTop = '20px';
    
    // 组装模态框内容
    resultContainer.appendChild(header);
    resultContainer.appendChild(results);
    resultContainer.appendChild(closeButton);
    modal.appendChild(resultContainer);
    
    // 添加到文档
    document.body.appendChild(modal);
    
    // 关闭功能
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}
