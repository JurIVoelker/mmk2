"use client";

import React, {useState} from "react";
import {ImageContent} from "@/components/cards-content/image-content";
import {VideoContent} from "@/components/cards-content/video-content";
import {TextContent} from "@/components/cards-content/text-content";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {CarouselSlideContent} from "@/components/carousel-slide-content";
import {cn} from "@/lib/utils";

type ContentType = "image" | "video" | "newspaper";

const InfoContent = ({onClose}: { onClose?: () => void }) => {
    const [currentContent, setCurrentContent] = useState<ContentType>("image");

    const labelMap: { [key in ContentType]: string } = {
        image: "Instagram",
        video: "Tiktok",
        newspaper: "Zeitungsartikel",
    };

    const infoOrder: ContentType[] = ["image", "video", "newspaper"];

    const textMap: { [key in ContentType]: React.ReactNode } = {
        image:
            <section>
                <h2 className="text-xl font-semibold mb-4">
                    Erkennungsmerkmale bei Instagram-Posts
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-base">
                    <li>Stammt der Beitrag von einer <strong>seriösen Quelle</strong> oder einem verifizierten Profil?</li> {/* geändert */}
                    <li>Ist der <strong>@-Name korrekt</strong> geschrieben oder bewusst ähnlich zu einem bekannten Namen gefälscht?</li> {/* geändert */}
                    <li>Wie viele <strong>Follower</strong> hat der Verfasser – wirkt das Profil glaubwürdig oder künstlich erstellt?</li> {/* geändert */}
                    <li>Passen die Anzahl der <strong>Likes und Kommentare</strong> zur angeblichen Reichweite des Beitrags?</li> {/* geändert */}
                    <li>Wirken <strong>Kommentare authentisch</strong> oder generisch (z. B. „So true!“, „Unfassbar!“ ohne Bezug)?</li> {/* geändert */}
                    <li>
                        Könnte das Bild <strong>KI-generiert</strong> oder stark bearbeitet sein? Anzeichen:
                        <ul className="list-disc pl-5 mt-1">
                            <li><strong>Unnatürliche Proportionen</strong> oder Hintergründe</li> {/* geändert */}
                            <li><strong>Verzerrte Hände</strong>, Texturen oder Schriften</li> {/* geändert */}
                        </ul>
                    </li>
                    <li>Wird eine <strong>Quelle genannt</strong> – und ist sie vertrauenswürdig und überprüfbar?</li> {/* geändert */}
                    <li>Verwendet der Beitrag <strong>auffällige Sprache</strong> oder Schlagwörter ohne Kontext?</li> {/* geändert */}
                    <li>Fehlt eine <strong>klare Einordnung</strong> mit Fakten, Ort oder Zeitangabe?</li> {/* geändert */}
                </ul>
            </section>,
        video:
            <section>
                <h2 className="text-xl font-semibold mb-4">
                    Erkennungsmerkmale bei kurzen Videos (z. B. TikTok, Shorts)
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-base">
                    <li>Stammt das Video von einer <strong>verlässlichen Quelle</strong> oder einem glaubwürdigen Kanal?</li> {/* geändert */}
                    <li>Ist der <strong>@-Name korrekt</strong> geschrieben, oder handelt es sich um eine Fälschung?</li> {/* geändert */}
                    <li>Hat der Verfasser eine realistische Anzahl an <strong>Followern</strong> oder wirkt das Profil künstlich?</li> {/* geändert */}
                    <li>Weist das Video Merkmale einer <strong>KI-Erstellung</strong> auf?</li> {/* geändert */}
                    <li>Hat das Video nur sehr wenige <strong>Likes oder Kommentare</strong> trotz angeblicher Reichweite?</li> {/* geändert */}
                    <li>Stimmen <strong>Likes und Kommentare</strong> inhaltlich zum Video oder wirken sie generisch?</li> {/* geändert */}
                    <li>Wird auf eine <strong>externe Quelle</strong> verwiesen, und ist diese nachvollziehbar?</li> {/* geändert */}
                    <li>Nutzt das Video <strong>Sensationssprache</strong> ohne Belege?</li> {/* geändert */}
                    <li>Fehlen <strong>klare Angaben</strong> zum Datum, Ort oder Kontext?</li> {/* geändert */}
                    <li>Ist das Video auffällig stark geschnitten oder wirkt es <strong>zusammengesetzt</strong>?</li> {/* geändert */}
                </ul>
            </section>,
        newspaper:
            <section>
                <h2 className="text-xl font-semibold mb-4">
                    Erkennungsmerkmale von Fake-Artikeln
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Ist der Verfasser einem <strong>seriösen Nachrichtenportal</strong> zuzuordnen?</li> {/* geändert */}
                    <li>Achte auf <strong>verfälschte Namen</strong>, z. B. „Tageschau“ statt „Tagesschau“.</li> {/* geändert */}
                    <li>Seriöse Quellen verwenden selten <strong>Superlative</strong> oder übertriebene Sprache.</li> {/* geändert */}
                    <li>
                        Prüfe, ob Text oder Bilder <strong>KI-generiert</strong> wirken. Typische Anzeichen:
                        <ul className="list-disc pl-5 mt-1">
                            <li><strong>Gedankenstriche</strong> im Übermaß</li> {/* geändert */}
                            <li><strong>Wiederholungen</strong> oder unlogische Textstellen</li> {/* geändert */}
                            <li><strong>Unnatürliche Bilder</strong> oder unpassende Grafiken</li> {/* geändert */}
                        </ul>
                    </li>
                    <li>Gibt es ein aktuelles <strong>Veröffentlichungsdatum</strong> und einen nachvollziehbaren Autor?</li> {/* geändert */}
                    <li>Werden <strong>vertrauenswürdige Quellen</strong> verlinkt oder genannt?</li> {/* geändert */}
                    <li>Ist die Sprache auffällig <strong>emotional</strong> oder alarmierend?</li> {/* geändert */}
                    <li>Gibt es <strong>reißerische Überschriften</strong>, die irreführen?</li> {/* geändert */}
                    <li>Werden bekannte Fakten ohne <strong>Belege</strong> dargestellt?</li> {/* geändert */}
                    <li>Ist die Website voller <strong>Werbung</strong>, Pop-ups oder dubiosen Redirects?</li> {/* geändert */}
                    <li>Fehlen <strong>Impressum</strong>, Datenschutz oder Kontaktinformationen?</li> {/* geändert */}
                    <li>Wird nur eine <strong>einseitige Meinung</strong> präsentiert?</li> {/* geändert */}
                </ul>
            </section>,
    };

    const infoContentProvider = {
        id: "0",
        name: "TagesEcho",
        image: "/assets/message-provider-images/tagesecho.png",
        createdAt: new Date(),
    };

    return (
        <Carousel
            opts={{loop: true}}
            setApi={(api) => {
                if (!api) return;
                api.on("select", () => {
                    const index = api.selectedScrollSnap();
                    const newContent = ["image", "video", "newspaper"][
                        index
                        ] as ContentType;
                    setCurrentContent(newContent);
                });
            }}
        >
            <div className="flex flex-col w-full h-full text-center justify-between relative">
                <div className="absolute top-0 z-20 flex items-center p-2">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="transition-transform cursor-pointer hover:-translate-x-1 bg-white  rounded-full p-2 mx-2"
                        >
                            <img
                                src="/assets/icons/arrow-left.svg"
                                alt="Zurück"
                                className="w-6 h-6"
                            />
                        </button>
                    )}
                </div>
                <CarouselContent>
                    {infoOrder.map((type) => (
                        <CarouselItem key={type}>
                            <CarouselSlideContent
                                title={
                                    labelMap[type] + (type === "newspaper" ? "" : "-Beitrag")
                                }
                                content={
                                    type === "image" ? (
                                        <img src="./assets/info-content/instagram-content.jpg" />
                                    ) : type === "video" ? (
                                        <VideoContent src="./assets/info-content/tiktok-content.mp4"
                                                      likes="100"
                                                      comments="25"
                                                      provider={infoContentProvider}
                                                      infoContent={true}
                                        />
                                    ) : (
                                        <img src="./assets/info-content/newspaper-content.jpg" />
                                    )
                                }
                                text={textMap[type]}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </div>
            <div className="sticky bottom-0 bg-white z-10">
                <div className="flex justify-between p-4 w-full">
                    <div className="flex-1 flex justify-center">
                        <CarouselPrevious
                            currentContent={currentContent}
                            contentOrder={infoOrder}
                            labelMap={labelMap}
                        />
                    </div>
                    <div className="flex-1 flex gap-2 items-center justify-center">
                        {infoOrder.map((item) => (
                            <div
                                key={item}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-colors duration-300",
                                    item === currentContent ? "bg-brown" : "bg-brown-light"
                                )}
                            />
                        ))}
                    </div>
                    <div className="flex-1 flex justify-center">
                        <CarouselNext
                            currentContent={currentContent}
                            contentOrder={infoOrder}
                            labelMap={labelMap}
                        />
                    </div>
                </div>
            </div>
        </Carousel>
    );
};

export default InfoContent;
