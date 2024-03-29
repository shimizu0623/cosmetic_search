<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Request as RequestText;
use Illuminate\Support\Facades\Validator;
use \Symfony\Component\HttpFoundation\Response;

class RequestsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $user = $request->user();
        $date = \Carbon\Carbon::now();

        $validator = Validator::make($request->all(),[
            'detail' => 'required',
        ]);

        if ($validator->fails()){
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $create = RequestText::create([
            'detail' => $request->detail,
            'posted_date' => $date
        ]);

        return response()->json($create, Response::HTTP_OK);
    }
}