<script setup>

</script>

<template>
    <footer class="footer">
        <section class="container footer-section">
            <div class="footer-section-div">
                <h4>Contact us</h4>
                <div class="d-flex align-items-center contact mb-3">
                    <span class="material-icons">
                        call
                    </span>
                    <h5 class="ms-2">+8801911756854</h5>
                </div>
                <div class="d-flex align-items-center location mb-3">
                    <span class="material-icons">
                        location_on
                    </span>
                    <p class="ms-2">Gulshan, Dhaka, Bangladesh</p>
                </div>
                <div class="d-flex align-items-center mail mb-3">
                    <span class="material-icons">
                        mail
                    </span>
                    <p class="ms-2">foysalcse033@gmail.com</p>
                </div>
            </div>
            <div class="footer-section-div">
                <h4>Services</h4>

                <ul>
                    <li>Home delivery</li>
                    <li>24/7 support</li>
                    <li>Authentic products</li>
                    <li>Customer support</li>
                </ul>

            </div>
            <div class="footer-section-div">
                <h4>Company</h4>
                <ul>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Shop address</li>
                    <li>Career</li>
                    <li>Blogs</li>
                </ul>
            </div>
            <div class="footer-section-div">
                <h4>Social</h4>
                <ul>
                    <li>Facebook</li>
                    <li>LinkedIn</li>
                    <li>Instagram</li>
                    <li>Youtube</li>
                    <li>X</li>
                </ul>
            </div>
        </section>
        <section class="copyright-section">
            <div class="container copyright-paragrap-div">
                <p>Copyright © 2024 E-Commerce - All Rights Reserved</p>
                <p>Developed By Foysal Mahmood</p>
            </div>
        </section>
    </footer>
</template>

<style scoped>
h1, h2, h3, h4, h5, h6, p, span, ul, li {
    margin: 0;
    padding: 0;
}
.footer {
    /* margin-top: 30px; */
    background-color: #EFEFE7;
}

.contact h5 {
    color: #73755D;
    font-size: 18px;
    line-height: 24px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.contact span {
    color: #73755D;
    font-size: 24px;;
}

.location p {
    color: #73755D;
    font-size: 14px;
    line-height: 24px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.location span {
    color: #73755D;
    font-size: 24px;;
}

.mail p {
    color: #73755D;
    font-size: 14px;
    line-height: 24px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.mail span {
    color: #73755D;
    font-size: 24px;;
}

.footer-section {
    display: grid;
    grid-template-columns: 34% 20% 20% 20%;
    column-gap: 2%;
    padding: 30px 2px;
}

.footer-section-div h4 {
    border-bottom: 1px solid #C4C4C0;
    margin-bottom: 12px;
    font-size: 20px;
    color: #73755D;
    font-family: 'Poppins', sans-serif;
    line-height: 2;
}

.footer-section-div ul li {
    color: #73755D;
    font-size: 14px;
    line-height: 24px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    list-style: none;
}

.footer-section-div input {
    width: 244px;
    height: 26px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.footer-section-div button {
    width: 37px;
    height: 26px;
    margin-left: 5px;
}

.email-div {
    margin-top: 12px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.copyright-section {
    background-color: #F8F7F3;
}

.copyright-section div {
    display: flex;
    justify-content: space-between;

}

.copyright-paragrap-div {
    padding: 17px 2px;
}

.copyright-section p {
    color: #767772;
    font-size: 14px;
}



@media(max-width: 768px) {
    .container {
        width: 100%;
    }

    .footer-section {
        display: flex;
        flex-direction: column;
    }
}

@media(max-width: 768px) {
    .container {
        width: 100%;
    }

    .copyright-paragrap-div {
        display: flex;
        flex-direction: column;
    }
}
</style>