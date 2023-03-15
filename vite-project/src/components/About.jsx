function About() {
  return (
    <section className="about-section text-center" id="about">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-lg-8">
            <h2 className="text-white mb-4">
              There are many ways to make art.
            </h2>
            <p className="text-bigscreen-only col-lg-10 text-white-50">
              Apart from generating an image from a text prompt, DALL-E lets you
              create variations of an existing image or edit images. <br />
              Once you're happy with the result, connect your wallet, choose
              your preferred chain and mint your NFT!
            </p>
            <p className="text-mobile-only text-white-50">
              Start by describing your image in as much detail as you can.{" "}
              <br />
              <a
                href="https://www.howtogeek.com/836690/5-tips-to-get-the-best-results-from-dall-e-2/"
                target="_blank"
              >
                Read more
              </a>{" "}
              about how to finetune your prompts to get the best results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
