import { Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../store/moviesSlice';

import './movieSearchForm.scss';

const MovieSearchForm = (props) => {
    const moviesLoadingStatus = useSelector(state => state.movies.moviesLoadingStatus);
    const activeQueryValue = useSelector(state => state.movies.activeQueryValue);

    const dispatch = useDispatch();
    const updateMovie = async (searchValue) => {
        const query = {
            title: searchValue,
            page: 1,
        }
        dispatch(fetchMovies(query))
    }

    const validationSchema = Yup.object({
        searchValue: Yup.string().required('This field is required'),
    })

    return (
        <Formik 
            initialValues={{searchValue: activeQueryValue}}
            validationSchema={validationSchema}
            onSubmit={async ({searchValue}, {setSubmitting}) => {
                await updateMovie(searchValue)
                setSubmitting(false);
            }}
        >
            {({
                values, 
                errors, 
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form className="movie__search-form" onSubmit={handleSubmit}>
                    <label htmlFor="" className='movie__search-label'>Find movie by title</label>
                    <div className='movie__search-wrapper'>
                            <input 
                                type="text" 
                                name="searchValue" 
                                className='movie__search-label' 
                                placeholder='Batman'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.searchValue}
                            /> 
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={moviesLoadingStatus === 'loading'}
                        >
                            <div className="inner">Find</div>
                        </button>
                        
                    </div>
                    {errors.searchValue && touched.searchValue ? <div className='movie__search-error'>{errors.searchValue}</div> : null}
                </form>
            )}
           
        </Formik>
    )
}

export default MovieSearchForm;