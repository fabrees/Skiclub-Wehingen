import React from "react";
import Image from "next/image";
import { Sponsor, sponsorLevel, sponsoren, sponsorenByLevel } from "@/lib/sponsoren";

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => {
  const content = (
    <div className="flex h-32 w-52 items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition hover:ring-brand-500">
      {sponsor.logo ? (
        <Image
          src={sponsor.logo}
          alt={`Logo ${sponsor.name}`}
          width={400}
          height={250}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-center text-lg font-bold text-alb-900">{sponsor.name}</span>
      )}
    </div>
  );

  if (!sponsor.website) return content;

  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      title={sponsor.name}
    >
      {content}
    </a>
  );
};

const SponsorList = () => {
  if (sponsoren.length === 0) {
    return (
      <div className="max-w-3xl rounded-2xl bg-white p-8 ring-1 ring-slate-200">
        <p className="text-lg leading-relaxed">
          Unsere Sponsoren werden hier in Kürze vorgestellt. Sie möchten den
          Trail unterstützen? Dann melden Sie sich bei uns unter{" "}
          <a
            href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#97;&#117;&#115;&#115;&#99;&#104;&#117;&#115;&#115;&#64;&#115;&#99;&#45;&#119;&#101;&#104;&#105;&#110;&#103;&#101;&#110;&#46;&#100;&#101;"
            className="font-bold text-brand-600 hover:underline"
          >
            ausschuss@sc-wehingen.de
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {sponsorLevel.map((level) => {
        const sponsorenDerStufe = sponsorenByLevel(level.key);
        if (sponsorenDerStufe.length === 0) return null;

        return (
          <div key={level.key} className="flex flex-col items-center gap-4">
            <h3 className="text-xl font-extrabold text-alb-900 sm:text-2xl">
              {level.title}
            </h3>
            <p className="text-center text-lg text-slate-500">{level.description}</p>

            <div className="mt-4 flex flex-wrap justify-center gap-6">
              {sponsorenDerStufe.map((sponsor) => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SponsorList;
