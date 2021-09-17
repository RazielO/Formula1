<script>
    export let size = 120;
    export let units = "px";
</script>

<div
    class="loader"
    style="height: {size}{units}; width: {size}{units}; 
    border: {size * 0.15}{units} solid #f3f3f3;
    border-top: {size * 0.15}{units} solid #636e72;"
/>

<style>
    .loader {
        margin: 0 auto;
        border-radius: 50%;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
