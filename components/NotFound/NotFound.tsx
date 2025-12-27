
import Link from "next/link";
import css from './NotFound.module.css'
 
const NotFound404 = () => {

    return (
        <section>
            <div className={css.error}>
                <h1>404</h1>
                <h2>Сторінку не знайдено</h2>
                <p>На жаль, сторінку, яку ви шукаєте, не існує або була переміщена.</p>
                <Link href="/">Повернутися на головну</Link>   
            </div>
        </section>
    )
}

export default NotFound404;