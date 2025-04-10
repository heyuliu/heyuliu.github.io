const searchLink = document.getElementById('searchLink');
const aboutLink = document.getElementById('aboutLink');
const searchBox = document.getElementById('searchBox');
const aboutBox = document.getElementById('aboutBox');

// 点击“搜索”显示/隐藏搜索框
searchLink.addEventListener('click', () => {
    searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
    aboutBox.style.display = 'none'; // 隐藏关于板块
});

// 点击“关于”显示/隐藏关于板块
aboutLink.addEventListener('click', () => {
    aboutBox.style.display = aboutBox.style.display === 'block' ? 'none' : 'block';
    searchBox.style.display = 'none'; // 隐藏搜索框
});
// 点击页面其他地方隐藏输入框
document.addEventListener('click', (event) => {
    // 如果点击的目标不在 searchBox 和 searchLink 内，隐藏 searchBox
    if (!searchBox.contains(event.target) && event.target !== searchLink) {
        searchBox.style.display = 'none';
    }
    // 如果点击的目标不在 aboutBox 和 aboutLink 内，隐藏 aboutBox
    if (!aboutBox.contains(event.target) && event.target !== aboutLink) {
        aboutBox.style.display = 'none';
    }
});