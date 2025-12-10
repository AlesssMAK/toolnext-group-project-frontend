// import Text from '@/components/Text/Text';

const Loading = () => {
  // return <Text marginBottom="150px">Loading, please wait...</Text>;
};

// export default Loading;

import css from "./loading.module.css";

export default function LoadingIndicator(){
    return <p className={css.text}>Loading, please wait...</p>
}
