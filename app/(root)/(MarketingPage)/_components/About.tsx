import Image from "next/image";
import { Statistics } from "./Statistics";


export const About = () => {
  return (
    <section
      id="about"
      className=" "
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
        <Image
              width={250}
              height={250}
              src={'/images/logo.svg'}
              alt=""
              className="w-[200px] object-contain rounded-lg"
            />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Company
              </h2>
              <p className="text-lg text-muted-foreground mt-4">
                MyClinix is your premier destination for modern clinic management. With our user-friendly platform, clinics effortlessly handle appointments, profiles, secure communication, and multi-clinic support. Our innovative tools streamline operations, empowering clinics to focus on patient care. From customizable profiles to HIPAA-compliant communication, MyClinix ensures efficiency and security. Join our community today and revolutionize your practice. Elevate patient care with MyClinix – where simplicity meets excellence. Experience the future of clinic management now. Welcome to MyClinix, where your success is our priority.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};