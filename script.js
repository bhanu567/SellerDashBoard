window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/d8de08a6360f4be58ad45314a92a1475/Products")
    .then((r) => {
      for (let index = 0; index < r.data.length; index++) {
        showData(
          r.data[index]._id,
          r.data[index].productName,
          r.data[index].sellingPrice
        );
      }
    })

    .catch((e) => {
      alert(e);
    });
});

let button = document.getElementById("button");

button.addEventListener("click", () => {
  let sellingPrice = document.getElementById("sellingPrice").value;
  let productName = document.getElementById("productName").value;
  axios
    .post(
      "https://crudcrud.com/api/d8de08a6360f4be58ad45314a92a1475/Products",
      {
        sellingPrice: sellingPrice,
        productName: productName,
      }
    )
    .then((res) =>
      showData(res.data._id, res.data.productName, res.data.sellingPrice)
    )
    .catch((error) => alert(error));
});
function showData(_id, productName, sellingPrice) {
  let div = document.createElement("div");
  div.innerHTML = `<b>${_id} - ${productName} - ${sellingPrice}</b> <button id="deleteButton">Delete Product</button>`;
  let h3 = document.getElementsByTagName("h3")[0];
  document.body.insertBefore(div, h3);
  let span = document.getElementById("totalPrice");
  let price = Number(span.outerText) + Number(sellingPrice);
  span.innerText = price;
  let deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener("click", () => {
    let datas = deleteButton.parentElement.outerText;
    deleteButton.parentElement.remove();
    let dt = datas.split(" - ");
    axios
      .delete(
        "https://crudcrud.com/api/d8de08a6360f4be58ad45314a92a1475/Products/" +
          dt[0]
      )
      .then(() => {
        alert("Data Deleted Succesfully");
        let span = document.getElementById("totalPrice");
        let reducedPrice = dt[2].split(" ");
        let price = Number(span.outerText) - Number(reducedPrice[0]);
        span.innerText = price;
      })
      .catch((e) => alert(e));
  });
}
