function IndexPage() {
  return (
    <div className="IndexPage">
      <h2>Синонимы</h2>
      <ul>
        <li>Болезнь Рандю́ — О́слера (Рандю — Ослера — Ве́бера)</li>
        <li>синдром Ослера</li>
        <li>семейная наследственная телеангиэктазия</li>
        <li>наследственная геморрагическая телеангиэктазия</li>
        <li>геморрагический ангиоматоз</li>
      </ul>

      <h2>О болезни</h2>

      <p>
        <strong>Наследственное</strong> заболевание сосудов, на разных участках
        кожи и слизистых оболочках губ, рта, во внутренних органах образуется
        кровотечения.
      </p>

      <p>
        Большинство больных не подозревают о своей болезни длительное время и
        остаются не диагностированными.
      </p>

      <p>
        Развитие болезни у ребенка происходит при передаче поврежденного гена от
        любого из родителей.
      </p>

      <p>Ненаследственные патологии фиксируются крайне редко.</p>

      <p>
        Первые симптомы болезни Рандю – Ослера можно наблюдать у детей 6-10 лет.
      </p>

      <p>
        Как правило, они проявляются на голове, мочках ушей, слизистых десен,
        щек, губ и на крыльях носа.
      </p>

      <p>
        По мере взросления количество ангиэктазий увеличивается, а кровоточат
        они чаще и сильнее.
      </p>

      <p>
        Телеангиэктазии на губах при наследственной геморрагической
        телеангиэктазии (Википедия)
      </p>
      <p>
        <img
          height={200}
          src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Case_115.jpg"
          alt="Телеангиэктазии на губах при наследственной геморрагической телеангиэктазии"
        />
      </p>

      <h2>Наследственность</h2>
      <p>
        Передаётся по аутосомно-доминантному типу; встречается примерно у одного
        из 5000 человек.
      </p>
      <p>
        <img
          height={400}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Autosomal_dominant_-_en.svg/701px-Autosomal_dominant_-_en.svg.png?20231005223322"
          alt="аутосомно-доминантному типу"
        />
      </p>
      <h2>
        Что означает, когда болезнь имеет аутосомно-доминантный тип
        наследования?
      </h2>
      <p>
        Когда говорят, что болезнь имеет аутосомно-доминантный тип наследования,
        это значит, что для проявления заболевания достаточно получить только
        одну копию изменённого (мутировавшего) гена от одного из родителей. Вот
        основные моменты, которые помогают понять, что это значит:
      </p>

      <h2>Основные моменты</h2>
      <ol>
        <li>
          <strong>Передача по наследству:</strong> Ген может быть унаследован от
          мамы или папы, и он находится на аутосомах — неполовых хромосомах (не
          X или Y). Это означает, что шансы унаследовать его не зависят от пола
          ребёнка.
        </li>
        <li>
          <strong>Одна копия гена вызывает заболевание:</strong> В нашем геноме
          каждый ген представлен двумя копиями — одна от мамы и одна от папы.
          Для аутосомно-доминантного заболевания достаточно, чтобы одна из этих
          двух копий была изменённой, чтобы болезнь проявилась. В этом случае
          даже если другая копия гена нормальная, изменённая копия будет
          "доминировать" и приведет к развитию болезни.
        </li>
        <li>
          <strong>Вероятность передачи:</strong> Если один из родителей имеет
          аутосомно-доминантное заболевание, то у каждого ребёнка есть 50% шанс
          унаследовать изменённый ген и тоже заболеть. Если же ребёнок не
          унаследует этот ген, он не будет болеть и не передаст заболевание
          дальше.
        </li>
      </ol>
    </div>
  );
}

export default IndexPage;
