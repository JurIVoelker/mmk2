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
                <div className="overflow-y-scroll py-4 px-2">
                    <h3 className="font-semibold text-lg">Angaben gemäß § 5 TMG</h3>
                    <p><strong>Max Mustermann</strong></p>
                    <p>Mustermann GmbH</p>
                    <p>Beispielstraße 123</p>
                    <p>12345 Musterstadt</p>

                    <h3 className="font-semibold text-lg">Vertreten durch:</h3>
                    <p>Max Mustermann (Geschäftsführer)</p>

                    <h3 className="font-semibold text-lg">Kontakt</h3>
                    <p>Telefon: +49 123 456789</p>
                    <p>Fax: +49 123 456780</p>
                    <p>E-Mail: <a href="mailto:info@mustermann.de">info@mustermann.de</a></p>

                    <h3 className="font-semibold text-lg">Handelsregister</h3>
                    <p>Amtsgericht Musterstadt, HRB 12345</p>

                    <h3 className="font-semibold text-lg">Umsatzsteuer-Identifikationsnummer</h3>
                    <p>DE123456789</p>

                    <h3 className="font-semibold text-lg">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                    <p>Max Mustermann</p>

                    <h3 className="font-semibold text-lg">Haftungsausschluss</h3>
                    <p>Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Dennoch übernehmen wir keine Haftung für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf dieser Seite nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>

                    <h3 className="font-semibold text-lg">Externe Links</h3>
                    <p>Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>

                    <h3 className="font-semibold text-lg">Copyright</h3>
                    <p>Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
                </div>
            </div>
        </CustomLayout>
    )
}