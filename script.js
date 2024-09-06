let bookNo = 1;

function registerBook() {

  // 카테고리 
  let category = document.getElementById("category").value;

  // 책 이름 
  let bookName = document.getElementById("bookname").value;

  // 가격
  let bookPrice = document.getElementById("bookprice").value;

  const tableBody = document.getElementById("book-list-tbody");

  if (category === "") {
    alert("카테고리를 선택해주세요.");
    return false;
  } else if (bookName === "") {
    alert("도서명을 입력해주세요");
    return false;
  } else if (bookPrice === "") {
    alert("가격을 입력해주세요.");
    return false;
  }

  let newRow = `
      <tr> 
        <td>${bookNo}</td>
        <td>${category}</td>
        <td>${bookName}</td>
        <td>${bookPrice}</td>
        <td><button onclick="remove(this)">삭제</button></td>
      </tr>
      `;

  // 중복값 체크
  const table = document.getElementById("book-list-tbody");
  const rows = table.querySelectorAll("tbody tr");

  // 중복값에 대한 확인 변수
  let showRow = true;

  rows.forEach(row => {
    // 카테고리 셀 추출
    let cateCell = row.querySelectorAll("td")[1];
    let cateText = cateCell.textContent.toLowerCase().trim();

    // 도서명 셀 추출
    let nameCell = row.querySelectorAll("td")[2];
    let nameText = nameCell.textContent.toLowerCase().trim();

    // 저장되있는 카테고리, 도서명과 입력한 카테고리, 도서명에 대해 값이 하나라도 같다면,
    // alert창 띄어지면서, showRow가 false로 바뀜
    // 결과적으로, 아지막 showRow 조건문에 해당이 되지않기에,
    // 도서등록이 되지 않는다.
    if (cateText === category && nameText === bookName) {
      alert("같은 카테고리 안에 동일한 책이 중복되어 있습니다.");
      showRow = false;
    }
  });

  // showRow가 True일때, 도서 등록 관련 조건문
  if (showRow) {
    // 성공 시 출력되는 alert 창
    alert("도서가 성공적으로 등록되었습니다.");
    // 데이터 삽입
    tableBody.insertAdjacentHTML("beforeend", newRow);
    // 성공 시 도서등록 폼 초기화
    document.getElementById("book-register-form").reset();

    // 책번호 증가
    bookNo += 1;
    return true;
  }

}

// 삭제 함수
function remove(button) {
  let row = button.closest("tr");
  row.remove();
}

// 초기화 버튼 누를시 호출되는 함수
function reset() {
  document.getElementById("category").value = "";
  document.getElementById("bookName").value = "";
  document.getElementById("bookPrice").value = "";
}

// 도서명 검색 함수
function search() {
  const nameValue = document.getElementById("search-input").value.toLowerCase().trim();

  const table = document.getElementById("book-list-tbody");
  const rows = table.querySelectorAll("tbody tr");

  let bookPrice = document.getElementById("bookprice").value;

  if (nameValue) {
    rows.forEach(row => {
      const nameCell = row.querySelectorAll("td")[2];
      const nameText = nameCell.textContent.toLowerCase().trim();
      const showRow = nameText.includes(nameValue);
      row.style.display = showRow ? "" : "none";
    });
  }

  // 오름차순 내림차순 (미완)
  let sorted = document.getElementById("sort-select").value;

  sorted.sort((a, b) => {
    const priCell = bookPrice.querySelectorAll("td")[3];
    const price = parseInt(priCell);

    if (sorted === "ascending") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });


}

// 도서명 초기화 함수
function searchReset() {
  document.getElementById("search-input").value = "";
  const table = document.getElementById("book-list-tbody");
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach(row => {
    row.style.display = "";
  });
}
