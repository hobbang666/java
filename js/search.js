const search_message = () => {
    let message = "검색을 시작합니다!!!";
    alert(message);
    document.getElementById("search_button_msg").addEventListener('click', search_message);
}

const badWords = ['시발', '씨발', '병신', '좆', '꺼져']; 

function googleSearch() {
    const searchTerm = document.getElementById("search_input").value.trim(); 
    if (searchTerm.length === 0) {
        alert("검색어를 입력해주세요.");
        return;
    }

    for (let i = 0; i < badWords.length; i++) {
        if (searchTerm.includes(badWords[i])) {
            alert("비속어가 포함되어 있습니다.");
            return;
        }
    }
    
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    window.open(googleSearchUrl, "_blank");
    return false;
}