var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var count = document.getElementById("count");
var labelCount = document.getElementById("labelCount");
var category = document.getElementById("category");
var categoryList = document.getElementById("categoryList");
var tableContent = document.getElementById("tableContent");
var submitBtn = document.getElementById("submitBtn");
var searchTitle = document.getElementById("searchTitle");
var searchCategory = document.getElementById("searchCategory");

var products;
var mood = "create";
var tmp;

if (localStorage.getItem("myProduct") == null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("myProduct"));
  displayProduct();
}

// Get Total

function getTotal() {
  if (price.value != "") {
    var result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#9eb23b";
  } else {
    total.style.background = "#eb1d36";
    total.innerHTML = "Total :";
  }
}

// Add Product

function addProduct() {
  var product = {
    Title: title.value.toLowerCase(),
    Price: price.value,
    Taxes: taxes.value,
    Ads: ads.value,
    Discount: discount.value,
    Total: total.innerHTML,
    Count: count.value,
    Category: category.value.toLowerCase(),
  };

  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood == "create") {
      if (product.Count > 1) {
        for (var i = 0; i < product.Count; i++) {
          products.push(product);
        }
      } else {
        products.push(product);
      } clearForm();
    } else {
      products[tmp] = product;
      mood = "create";
      submitBtn.innerHTML = "Create";
      count.style.display = "block";
      labelCount.style.display = "block";
    }
  } 
 
  displayProduct();
  localStorage.setItem("myProduct", JSON.stringify(products));
}

// Clear Form

function clearForm() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
}

// Display Product

function displayProduct() {
  getTotal();
  var box = "";
  for (var i = 0; i < products.length; i++) {
    box += `<tr>
      <th>${i + 1}</th>
      <th>${products[i].Title}</th>
      <td>${products[i].Price}</td>
      <td>${products[i].Taxes}</td>
      <td>${products[i].Ads}</td>
      <td>${products[i].Discount}</td>
      <td>${products[i].Total}</td>
      <td>${products[i].Category}</td>
      <td>
        <button onclick="updateProduct(${i})" class=" btn btn-update"> Update </button>
      </td>
      <td>
        <button onclick="deleteProduct(${i})" class=" btn btn-delete"> Delete </button>
      </td>
    </tr>`;
  }
  tableContent.innerHTML = box;

  var btnDeleteAll = document.getElementById("btnDeleteAll");
  if (products.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAll()" class="btn w-100"
    id="deleteAll">Delete All</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}

// Update Product

function updateProduct(id) {
  title.value = products[id].Title;
  price.value = products[id].Price;
  taxes.value = products[id].Taxes;
  ads.value = products[id].Ads;
  discount.value = products[id].Discount;
  count.value = products[id].Count;
  category.value = products[id].Category;
  getTotal();
  submitBtn.innerHTML = "Update";
  mood = "update";
  tmp = id;
  count.style.display = "none";
  labelCount.style.display = "none";
  scroll({
    top: 0,
  });
}

// Delete Product

function deleteProduct(id) {
  products.splice(id, 1);
  displayProduct();
  localStorage.setItem("myProduct", JSON.stringify(products));
}

// Delete All

function deleteAll() {
  localStorage.clear();
  products.splice(0);
  displayProduct();
}

// Search

var searchMood = "Title";
function getSearchMood(id) {
  var search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "Title";
  } else {
    searchMood = "searchCategory";
  }
  search.focus();
  search.value = "";
}

function searchData(value) {
  var box = "";
  if (searchMood == "Title") {
    for (var i = 0; i < products.length; i++) {
      if (products[i].Title.includes(value)) {
        box += `<tr>
        <th>${i + 1}</th>
        <th>${products[i].Title}</th>
        <td>${products[i].Price}</td>
        <td>${products[i].Taxes}</td>
        <td>${products[i].Ads}</td>
        <td>${products[i].Discount}</td>
        <td>${products[i].Total}</td>
        <td>${products[i].Category}</td>
        <td>
          <button onclick="updateProduct(${i})" class=" btn btn-update"> Update </button>
        </td>
        <td>
          <button onclick="deleteProduct(${i})" class=" btn btn-delete"> Delete </button>
        </td>
      </tr>`;
      }
    }
  } else {
    for (var i = 0; i < products.length; i++) {
      if (products[i].Category.includes(value)) {
        box += `<tr>
        <th>${i + 1}</th>
        <th>${products[i].Title}</th>
        <td>${products[i].Price}</td>
        <td>${products[i].Taxes}</td>
        <td>${products[i].Ads}</td>
        <td>${products[i].Discount}</td>
        <td>${products[i].Total}</td>
        <td>${products[i].Category}</td>
        <td>
          <button onclick="updateProduct(${i})" class=" btn btn-update"> Update </button>
        </td>
        <td>
          <button onclick="deleteProduct(${i})" class=" btn btn-delete"> Delete </button>
        </td>
      </tr>`;
      }
    }
  }

  tableContent.innerHTML = box;
}
