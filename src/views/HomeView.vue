<template>
  <div class="home">
    <section class="hero">
      <div class="hero-cellphone">aqui foto del iphone</div>
    </section>

    <section class="info">
      <b-container class="info-container">
        <h1 class="info-container__title">info section</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          nisi mollitia cupiditate dolorem aspernatur porro vero eius aliquid,
          ut dignissimos non quisquam ipsam quidem molestiae iure iste id
          veritatis nemo.
        </p>

        <b-container class="info-container">
          <b-row>
            <b-col>
              <ul>
                <li>
                  <b-avatar
                    rounded
                    src="https://placekitten.com/300/300"
                    size="5rem"
                  ></b-avatar>
                </li>
                <li><h4>subtitulo</h4></li>
                <li><p>textito descriptivo</p></li>
              </ul>
            </b-col>

            <b-col>
              <ul>
                <li>
                  <b-avatar
                    rounded
                    src="https://placekitten.com/300/300"
                    size="5rem"
                  ></b-avatar>
                </li>
                <li><h4>subtitulo</h4></li>
                <li><p>textito descriptivo</p></li>
              </ul>
            </b-col>

            <b-col>
              <ul>
                <li>
                  <b-avatar
                    rounded
                    src="https://placekitten.com/300/300"
                    size="5rem"
                  ></b-avatar>
                </li>
                <li><h4>subtitulo</h4></li>
                <li><p>textito descriptivo</p></li>
              </ul>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </section>

    <!-- preview section -->
    <section class="preview">
      <b-container class="preview-container">
        <h1 class="preview-container__title">Preview section</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          nisi mollitia cupiditate dolorem aspernatur porro vero eius aliquid,
          ut dignissimos non quisquam ipsam quidem molestiae iure iste id
          veritatis nemo.
        </p>

        <div class="preview-container__image">
          aquí imagen del sitripio con shubaka chatiando
        </div>
      </b-container>
    </section>

    <!-- team section -->
    <section class="team">
      <b-container class="team-container">
        <h1 class="team-container__title">Team section</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          nisi mollitia cupiditate dolorem aspernatur porro vero eius aliquid,
          ut dignissimos non quisquam ipsam quidem molestiae iure iste id
          veritatis nemo.
        </p>

        <b-container class="team-container">
          <b-row>
            <b-col>
              <ul>
                <li>
                  <b-avatar
                    src="https://placekitten.com/300/300"
                    size="5rem"
                  ></b-avatar>
                </li>
                <li><h4>subtitulo</h4></li>
                <li><p>textito descriptivo</p></li>
              </ul>
            </b-col>

            <b-col>
              <ul>
                <li>
                  <b-avatar
                    src="https://placekitten.com/300/300"
                    size="5rem"
                  ></b-avatar>
                </li>
                <li><h4>subtitulo</h4></li>
                <li><p>textito descriptivo</p></li>
              </ul>
            </b-col>

            <b-col>
              <ul>
                <li>
                  <b-avatar
                    src="https://placekitten.com/300/300"
                    size="5rem"
                  ></b-avatar>
                </li>
                <li><h4>subtitulo</h4></li>
                <li><p>textito descriptivo</p></li>
              </ul>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </section>



        <!-- feedback section -->
    <section class="feedback">
      <b-container class="feedback-container">
        <h1 class="feedback-container__title">feedback section</h1>


        <b-row>
        <b-col class="feedback-col__text_flex_centered">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus in iure explicabo magni minus illum velit hic eos corrupti, voluptatum, voluptate possimus eveniet vero omnis nihil atque doloribus accusamus nesciunt.</p>
        </b-col>
        
        <b-col>
        <div class="feedback-container__image">
          aquí imagen del matrimonio de clones
        </div></b-col>

        </b-row>
      </b-container>
    </section>


            <!-- footer section -->
    <footer class="footer">
      <b-container class="footer-container">
        <h1 class="footer-container__title">un footer feo </h1>

      </b-container>
    </footer>

  </div>
</template>

<script>
export default {};
</script>

<style >
*{
  pading: 0px;
  margin: 0px;
  box-sizing: border-box;
}
.hero {
  width: 100%;
  height: 80vh;
  background-color: green;
  display: flex;
  justify-content: flex-end;
}
li {
  list-style-type: none;
}
.hero-cellphone {
  position: absolute;
  width: 450px;
  height: 80vh;
  margin-top: 100px;
  margin-right: 100px;
  background-color: rgb(78, 175, 33);
}

.info {
  background-color: rgb(25, 176, 166);
  padding-bottom: 2rem;
}
.info-container {
  margin-top: 100px;
}
.info-container__title {
  padding: 2rem;
}

.team {
  background-color: rgb(141, 161, 77);
  padding-bottom: 2rem;
}
.team-container {
  margin-top: 100px;
}
.team-container__title {
  padding: 2rem;
}

.preview {
  background-color: rgb(180, 182, 171);
  padding-bottom: 2rem;
}
.preview-container {
  margin-top: 100px;
}
.preview-container__title {
  padding: 2rem;
}

.preview-container__image {
  width: 400px;
  height: 400px;
  background-color: red;
  margin: 0 auto;
}


.feedback {
  background-color: rgb(180, 182, 171);
  padding-bottom: 2rem;
}
.feedback-container {
  margin-top: 100px;
}
.feedback-container__title {
  padding: 2rem;
}

.feedback-container__image {
  width: 400px;
  height: 400px;
  background-color: rgb(0, 145, 255);
  margin: 0 auto;
}
.feedback-col__text_flex_centered{
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  background-color: rgb(180, 182, 171);
}
.footer-container {
  margin-top: 100px;
}
.footer-container__title {
  margin-bottom: 0px;
  line-height: 2;
}

</style>
