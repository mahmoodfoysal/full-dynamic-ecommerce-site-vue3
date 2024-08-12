<script setup>

</script>

<template>
    <section class="container container-style">
        <!-- button div  -->
        <div class="add-btn-style">
            <button 
            data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"
            type="button" class="btn d-flex aligns-items-center mb-2"><span class="material-icons">
                    add
                </span>Add Category</button>
        </div>

        <!-- Add Category Modal div  -->
        
            <div class="offcanvas offcanvas-end category-div" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel" data-bs-backdrop="false" data-bs-keyboard="false">
                    <div class="d-flex align-items-center">
                        <button type="button" class="btn-close me-2 ms-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Add Category</h5>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form class="d-flex mt-3" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>

    </section>
</template>

<style scoped src="./Category.css"></style>