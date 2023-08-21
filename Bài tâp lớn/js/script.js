function loadfood() {
    fetch("/data/mainfood.json").then(res => res.json()).then(data => {
        let h ="";
        for (let f of data) {
            h+=`
            <div class="food">
                <div><img src="/images/mainfood/${f.img}" alt="Food_demo"></div>
                <div class="sale">Sale</div>
                <h3>${f.name}</h3>
            </div>
            `
        }
        let e = document.getElementById("foods")
        e.innerHTML = h;
    })
}

function loadcity() {
    fetch("/data/city.json").then(res => res.json()).then(data => {
        let h ="";
        for (let c of data) {
            h+=`<option value="">${c.name}</option>`
        }
        let e = document.getElementById("city")
        e.innerHTML += h;
    })
}

window.addEventListener('scroll', function() {
    let na = document.getElementById("navar");
    let totop = document.getElementById("scrolltotop");
    if (scrollY>0) {
        na.style.backgroundColor = "white";
        totop.style.display = "block";
    }    
    else {
        na.style.backgroundColor = "rgba(252, 250, 250, 0.2)";
        totop.style.display = "none";
    }
});

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

$(document).ready(function () {
    let num = $(".slide div").length;
    let current=-1;
    $(".slide > div").slideUp("slow");
    $(".slide > div").eq(current).slideDown("slow");
    let showslide = (current) => {
        $(".slide > div").slideUp("slow");
        $(".slide > div").eq(current).slideDown("slow");
    }
    $(".rightbtn").click(function() {
        current++;
        if (current === num)
            current=0;
        showslide(current);
    });
    $(".leftbtn").click(function() {
        current--;
        if (current < 0)
            current=num-1;
        showslide(current);
    });
    let now=0;
    let like = (now) => {
        $("section.right .img-info i").hide("slow");
        $("section.right .img-info i").eq(now).show("slow");
    }
    $("section.right .img-info i").click(function() {
        if (now===0)
            now=1;
        else
            now=0;
        like(now);
    });
    $("#show-bar").click(function() {
        $("nav").css({
            "left" : "0px",
            "right" : "50%"
        });
        $("#show-bar").hide();
    });
    $("#hide-bar").click(function() {
        $("nav").css("left", "-100%");
        $("#show-bar").show();
    });
    $(".foods .food img").click(function() {
        alert(this)
    });
});

s = `/data/${document.URL.slice(27,document.URL.length-5)}.json`

function loadlist() {
    fetch(s).then(res => res.json()).then(data => {
        let h ="";
        for (let f of data) {
            h+=`
            <div class="food v-food">
            <div><img src="${f.src}" alt="Food_demo"></div>
            <b>${f.name}</b>
            <div class="mota">
                <p>Gà rán - Burger, Cơm Món Quốc Tế</p>
                <ul>
                    <li><i class="fa-solid fa-star" style="color: #e0bf1a;"></i> 4.2</li>
                    <li><i class="fa-regular fa-clock"></i> 15 phút</li>
                    <li><i class="fa-solid fa-truck-fast"></i> 0,6 km</li>
                </ul>
            </div>
        </div>
            `
        }
        let e = document.getElementById("list")
        e.innerHTML = h;
    })
}
function pointer() {
    fetch(s).then(res => res.json()).then(data => {
        let fds = document.querySelectorAll(".foods .v-food img")
        for (let fd of fds) {
            fd.onclick = function() {
                let img = document.querySelector("section.right img");
                let index = this.src.slice(-5,-4)-1;
                let h="";
                h=`<img src="${data[index].src}" alt="">
                <div class="img-info">
                    <div>
                        <h2>${data[index].name}</h2>
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-solid fa-heart" style="color: #f76e9e;"></i>
                    </div> 
                    <p>Địa chỉ: 188 Nguyễn Văn Nghi, Phường 5, Gò Vấp, Tp. HCM</p>
                    <p>Điểm đánh giá: 4/5 (10.000+ lượt đánh giá trên Ofoods)</p>
                    <p>Mở cửa: 00:00 - 23:59</p>
                    <p>Giá chỉ còn: ${data[index].price}</p>
                </div>`
                let e = document.querySelector("section.right")
                e.innerHTML=h;
            }
        }    
    });
}



window.onload = function() {
    loadfood();
    loadcity();
    loadlist();
    pointer();
}

