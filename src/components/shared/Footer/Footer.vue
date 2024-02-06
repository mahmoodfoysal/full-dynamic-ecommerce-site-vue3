<script setup>

</script>

<template>
    <footer class="footer">
        <section class="container footer-section">
            <div class="footer-section-div">
                <h4>Stay In the Know!</h4>
                <p>Please Enter Your Email to join our meeting list</p>
                <div class="email-div">
                    <input type="email" name="" id="">
                    <button>Go</button>
                </div>
                <p>To unsubscribe please click here >></p>
            </div>
            <div class="footer-section-div">
                <h4>Services</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ea quisquam possimus adipisci voluptatum, quis exercitationem dolorum unde repellendus, error officiis veritatis</p>

            </div>
            <div class="footer-section-div">
                <h4>Company</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ea quisquam possimus adipisci voluptatum, quis exercitationem dolorum unde repellendus, error officiis veritatis</p>
            </div>
            <div class="footer-section-div">
                <h4>Social</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ea quisquam possimus adipisci voluptatum, quis exercitationem dolorum unde repellendus, error officiis veritatis</p>
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
.footer {
    /* margin-top: 30px; */
    background-color: #EFEFE7;
}
.footer-section {
    display: grid;
    grid-template-columns: 34% 20% 20% 20%;
    column-gap: 2%;
    padding: 30px 2px;
}
.footer-section-div h4{
    border-bottom: 1px solid #C4C4C0;
    margin-bottom: 12px;
    font-size: 20px;
    color: #73755D;
    font-family: 'Poppins', sans-serif;
    line-height: 2;
}
.footer-section-div p{
    color: #73755D;
    font-size: 12px;
    line-height: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.footer-section-div input{
    width: 244px;
    height: 26px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.footer-section-div button{
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
.copyright-section p{
    color: #767772;
    font-size: 12px;
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
    .copyright-paragrap-div{
        display: flex;
        flex-direction: column;
    }
}
</style>