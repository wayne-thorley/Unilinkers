<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\DestroyPropertyRequest;
use App\Models\Property;
use Illuminate\Http\JsonResponse;

class DestroyPropertyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(DestroyPropertyRequest $request, Property $property)
    {
        $this->authorize('delete', $property);

        $property->delete();

        return new JsonResponse([], JsonResponse::HTTP_NO_CONTENT);
    }
}
