const Mentions = () => {
  return (
    <div className="flex justify-center p-20 pb-25 items-stretch">
      <div className="max-w-4xl text-gray-800 space-y-8">
        <h1 className="text-3xl font-title font-bold text-center mb-8 dark:text-placeholder">
          Mentions légales
        </h1>

        <section>
          <h2 className="text-xl font-title font-bold mb-2 dark:text-placeholder">Hébergement</h2>
          <ul className="list-disc list-inside font-body space-y-1 dark:text-placeholder">
            <li>
              <strong>Base de données</strong> : Supabase Inc., 225 Bush Street,
              San Francisco, CA 94104, USA –
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:underline dark:text-yellow-500"
              >
                supabase.com
              </a>
            </li>
            <li>
              <strong>Backend (API)</strong> : Render Inc., 405 Howard Street,
              San Francisco, CA 94105, USA –
              <a
                href="https://render.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:underline dark:text-yellow-500"
              >
                render.com
              </a>
            </li>
            <li>
              <strong>Frontend</strong> : Vercel Inc., 340 South Lemon Avenue
              #4133, Walnut, CA 91789, USA –
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:underline dark:text-yellow-500"
              >
                vercel.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2 dark:text-placeholder">
            Propriété intellectuelle
          </h2>
          <p className="font-body mb-2 dark:text-placeholder">
            Le contenu du site BlaBlaBook (textes, images, code, etc.) est
            protégé par les lois en vigueur. Toute reproduction ou usage non
            autorisé est interdit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2 dark:text-placeholder">
            Données personnelles
          </h2>
          <p className="font-body mb-2 dark:text-placeholder">
            BlaBlaBook collecte des données personnelles uniquement pour assurer
            ses fonctionnalités. Conformément au RGPD, vous pouvez demander la
            suppression ou la modification de vos données à :
            contact@blablabook.fr
          </p>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2 dark:text-placeholder">Cookies</h2>
          <p className="font-body mb-2 dark:text-placeholder">
            Des cookies peuvent être utilisés pour améliorer l’expérience
            utilisateur. Vous pouvez les désactiver dans les paramètres de votre
            navigateur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2 dark:text-placeholder">
            Limitation de responsabilité
          </h2>
          <p className="font-body mb-2 dark:text-placeholder">
            BlaBlaBook ne peut être tenu responsable des erreurs ou
            interruptions de service, ni des dommages liés à l’utilisation du
            site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2 dark:text-placeholder">Crédits</h2>
          <ul className="list-disc list-inside font-body space-y-1 dark:text-placeholder">
            <li><strong>Icônes : </strong>FontAwesome</li>
            <li><strong>Images de catégories : </strong>Unsplash, Freepik</li>
            <li>
              <strong>Couvertures de livres : </strong>
              API <em>bookcover-api</em> développée par <a href="https://github.com/w3slley" target="_blank" rel="noopener noreferrer" className="text-yellow-700 hover:underline dark:text-yellow-500">
              @w3slley</a>, basée sur les données de Goodreads.
            </li>
            <li><strong>Source des données : </strong> <a href=" https://www.goodreads.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-700 hover:underline dark:text-yellow-500">Goodreads</a></li>
            <li>
              <strong>Droits des images :</strong> appartiennent à leurs éditeurs ou ayants droit respectifs.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Mentions;
