"use client";

import CustomLayout from "@/components/custom-layout";
import Link from "next/link";
import React from "react";

export default function Impressum() {
    return (
        <CustomLayout className="relative overflow-hidden">
            <div className="absolute top-4 z-20 flex items-center p-2">
                <Link
                    href={"/"}
                    className="transition-transform cursor-pointer hover:-translate-x-1 bg-white  rounded-full p-2 mx-2"
                >
                    <img
                        src="/assets/icons/arrow-left.svg"
                        alt="Zurück"
                        className="w-6 h-6"
                    />
                </Link>
            </div>
            <div className={"flex flex-col h-screen"}>
                <div className="sticky top-0 bg-white z-10 pt-4 pb-4 gap-1 flex items-center justify-center">
                    <h2 className="text-xl font-bold">Impressum</h2>
                </div>
                <div className="overflow-y-scroll py-8 px-2">
                    <p className="font-semibold">Jana K&auml;stel</p>
                    <p>UX/UI DEsigner</p>
                    <p>Molkestra&szlig;e 30</p>
                    <p>76133 Karlsruhe</p>

                    <h2 className="font-semibold text-lg pt-4">Kontakt</h2>
                    <p>Telefon: 0721/7723</p>
                    <p>Telefax: 123-4</p>
                    <p>E-Mail: kaja1020@h-ka.de</p>

                    <h2 className="font-semibold text-lg pt-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
                    <p>Berufsbezeichnung:</p>
                    <p>Softwareentwickler</p>
                    <p>Verliehen in:</p>
                    <p>Deutschland</p>

                    <h2 className="font-semibold text-lg pt-4">Redaktionell verantwortlich</h2>
                    <p>Alle Aktuellen Informationen, welche verwendet werden geh&ouml;ren Rechtlich und Inhaltlich den
                        Nachrichtenkan&auml;len, welche diese Inhalte im Internet ver&ouml;ffentlicht haben.</p>

                    <h2 className="font-semibold text-lg pt-4">EU-Streitschlichtung</h2>
                    <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a
                        href="https://ec.europa.eu/consumers/odr/" target="_blank"
                        rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br/> Unsere E-Mail-Adresse
                        finden Sie oben im Impressum.</p>

                    <h2 className="font-semibold text-lg pt-4">Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
                    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                        Verbraucherschlichtungsstelle teilzunehmen.</p>

                    <p>Quelle: <a href="https://www.e-recht24.de">e-recht24.de</a></p>
                </div>
            </div>
        </CustomLayout>
    )
}