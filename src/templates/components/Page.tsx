import '../css/Page.css';

const Page = ({ title, content }: any) => {
    return (
        <div className="page">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default Page;
