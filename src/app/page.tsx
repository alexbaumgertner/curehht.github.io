'use client'

import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

import { gql, useQuery } from '@apollo/client'

const GET_NEWS_ARTICLES = gql`
  query GetNewsArticles {
    newsArticles {
      id
      title
      author
      text
      created_at
      updated_at
    }
  }
`

function IndexPage() {
  const { data, loading, error } = useQuery(GET_NEWS_ARTICLES)

  console.log('loading: ', loading)
  console.log('error: ', error)
  console.log('data: ', data)

  return (
    <div className="IndexPage">
      <Container>
        <Row>
          <Col>
            <h2>Новости</h2>
            {loading && <Spinner animation="border" />}
            <ul>
              {!loading &&
                data?.newsArticles?.map((article) => (
                  <li key={article.id}>
                    <Link href={`/news/${article.id}`}>{article.title}</Link>
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
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
              <strong>Наследственное</strong> заболевание сосудов, на разных
              участках кожи и слизистых оболочках губ, рта, во внутренних
              органах образуется кровотечения.
            </p>
            <p>
              Большинство больных не подозревают о своей болезни длительное
              время и остаются не диагностированными.
            </p>
            <p>
              Развитие болезни у ребенка происходит при передаче поврежденного
              гена от любого из родителей.
            </p>
            <p>Ненаследственные патологии фиксируются крайне редко.</p>
            <p>
              Первые симптомы болезни Рандю – Ослера можно наблюдать у детей
              6-10 лет.
            </p>
            <p>
              Как правило, они проявляются на голове, мочках ушей, слизистых
              десен, щек, губ и на крыльях носа.
            </p>
            <p>
              По мере взросления количество ангиэктазий увеличивается, а
              кровоточат они чаще и сильнее.
            </p>
            <p>
              Телеангиэктазии на губах при наследственной геморрагической
              телеангиэктазии (Википедия)
            </p>
            <p>
              <img
                height="200"
                alt="Телеангиэктазии на губах при наследственной геморрагической телеангиэктазии"
                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Case_115.jpg"
              />
            </p>
            <h2>Наследственность</h2>
            <p>
              Передаётся по аутосомно-доминантному типу; встречается примерно у
              одного из 5000 человек.
            </p>
            <p>
              <img
                height="400"
                alt="аутосомно-доминантному типу"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Autosomal_dominant_-_en.svg/701px-Autosomal_dominant_-_en.svg.png?20231005223322"
              />
            </p>
            <h2>
              Что означает, когда болезнь имеет аутосомно-доминантный тип
              наследования?
            </h2>
            <p>
              Когда говорят, что болезнь имеет аутосомно-доминантный тип
              наследования, это значит, что для проявления заболевания
              достаточно получить только одну копию изменённого (мутировавшего)
              гена от одного из родителей. Вот основные моменты, которые
              помогают понять, что это значит:
            </p>
            <h2>Основные моменты</h2>
            <ol>
              <li>
                <strong>Передача по наследству:</strong> Ген может быть
                унаследован от мамы или папы, и он находится на аутосомах —
                неполовых хромосомах (не X или Y). Это означает, что шансы
                унаследовать его не зависят от пола ребёнка.
              </li>
              <li>
                <strong>Одна копия гена вызывает заболевание:</strong> В нашем
                геноме каждый ген представлен двумя копиями — одна от мамы и
                одна от папы. Для аутосомно-доминантного заболевания достаточно,
                чтобы одна из этих двух копий была изменённой, чтобы болезнь
                проявилась. В этом случае даже если другая копия гена
                нормальная, изменённая копия будет &ldquo;доминировать&rdquo; и
                приведет к развитию болезни.
              </li>
              <li>
                <strong>Вероятность передачи:</strong> Если один из родителей
                имеет аутосомно-доминантное заболевание, то у каждого ребёнка
                есть 50% шанс унаследовать изменённый ген и тоже заболеть. Если
                же ребёнок не унаследует этот ген, он не будет болеть и не
                передаст заболевание дальше.
              </li>
            </ol>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default IndexPage
